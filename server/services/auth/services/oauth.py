from authlib.integrations.starlette_client import OAuth
import secrets
from datetime import datetime, timezone, timedelta

# Environment variables
from shared.config import settings

# Types
from fastapi import Request
from services.auth.types import OAuthProvider, OAuthState, OAuthStates, OAuthAppWrapper

# Database
from shared.database.session import DatabaseSessionManager
from services.auth.repositories.oauth import OAuthRepository
from services.auth.schemas.oauth import UserCreate, OAuthProviderCreate, OAuthUserData, UserResponse

def generate_state() -> str:
    """Get the security state for OAuth.

    Returns:
        str: The security state.
    """
    return secrets.token_urlsafe(32)

oauth_states: OAuthStates = {}

class OAuthService:
    def __init__(self, db_manager: DatabaseSessionManager, provider: OAuthProvider):
        self.db_manager = db_manager
        self.provider = provider.value
        self.oauth_repo = OAuthRepository(db_manager)
        self.__init_oauth()
    
    def __init_oauth(self) -> None:
        self.oauth = OAuth()
        
        if self.provider not in [OAuthProvider.GOOGLE, OAuthProvider.GITHUB]:
            raise NotImplementedError(f'Provider {self.provider} is not supported')
        
        if self.provider==OAuthProvider.GOOGLE and self.provider not in self.oauth._clients:
            self.oauth.register(
                name=OAuthProvider.GOOGLE,
                client_id=settings.GOOGLE_CLIENT_ID,
                client_secret=settings.GOOGLE_CLIENT_SECRET,
                server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
                jwks_uri='https://www.googleapis.com/oauth2/v3/certs',
                client_kwargs={'scope': 'openid email profile'}
            )
        
        if self.provider==OAuthProvider.GITHUB and self.provider not in self.oauth._clients:
            self.oauth.register(
                name=OAuthProvider.GITHUB,
                client_id=settings.GITHUB_CLIENT_ID,
                client_secret=settings.GITHUB_CLIENT_SECRET,
                access_token_url='https://github.com/login/oauth/access_token',
                authorize_url='https://github.com/login/oauth/authorize',
                api_base_url='https://api.github.com/',
                client_kwargs={'scope': 'user:email'}
            )
    
    def store_oauth_state(self, state: str) -> None:
        """store the oauth state into global variable `oauth_states`

        Args:
            provider (str): The provider of the authentication.
            state (str): The state parameter to verify.
        """
        oauth_states[state] = OAuthState(**{
            'provider': self.provider, 
            'created_at': datetime.now(tz=timezone.utc), 
            'expires_at': datetime.now(tz=timezone.utc) + timedelta(minutes=10) # expires in 10 minutes
        })

    def verify_and_consume_oauth_state(self, state: str) -> bool:
        """Verify the state parameter against the database.

        Args:
            provider (str): The provider of the authentication.
            state (str): The state parameter to verify.

        Raises:
            ValueError: If the state does not match the session state.
        """
        if not state or state not in oauth_states:
            return False
        
        oauth_state_info = oauth_states[state]
        
        if oauth_state_info.expires_at < datetime.now(tz=timezone.utc):
            return False
        
        if oauth_state_info.provider != self.provider:
            return False
        
        del oauth_states[state]
        return True
    
    async def oauth_login(self, request: Request):
        # Generate CSRF protection state
        state = generate_state()  # Creates secure random string
        self.store_oauth_state(state)  # Store in oauth states dict

        # Create OAuth client and redirect to provider
        client = OAuthAppWrapper(self.oauth.create_client(self.provider))
        redirect_uri = f"http://localhost:8000/oauth/{self.provider}/callback"

        return await client.authorize_redirect(request, redirect_uri, state)
    
    async def _get_user_data(self, client: OAuthAppWrapper, token: dict) -> OAuthUserData:
        """Extract user data from OAuth provider response."""
        if self.provider == OAuthProvider.GOOGLE:
            user_info = token.get('userinfo')
            if not user_info:
                resp = await client.get('userinfo', token=token)
                user_info = resp.json()

            return OAuthUserData(
                provider_id=user_info['sub'],
                email=user_info['email'],
                name=user_info['name'],
                avatar_url=user_info.get('picture'),
                provider=OAuthProvider.GOOGLE
            )
            
        elif self.provider == OAuthProvider.GITHUB:
            user_resp = await client.get('user', token=token)
            user_info = user_resp.json()
            
            emails_resp = await client.get('user/emails', token=token)
            emails = emails_resp.json()
            primary_email = next((email for email in emails if email.get('primary')), None)
            
            return OAuthUserData(
                provider_id=str(user_info['id']),
                email=primary_email['email'] if primary_email else None,
                name=user_info['name'] or user_info['login'],
                avatar_url=user_info['avatar_url'],
                provider=OAuthProvider.GITHUB
            )

    async def oauth_callback(self, state: str, request: Request):
        # verify the state parameter
        if not state or not self.verify_and_consume_oauth_state(state):
            raise ValueError("Missing or invalid state parameter in callback.")

        client = OAuthAppWrapper(self.oauth.create_client(self.provider))

        try:
            token = await client.authorize_access_token(request)
            user_data = await self._get_user_data(client, token)
            
            # Check if user exists by provider ID
            print("Checking if user exists by provider ID")
            user = self.oauth_repo.get_user_by_provider_id(
                OAuthProvider(self.provider),
                user_data.provider_id
            )
            
            if not user:
                # Check if user exists by email
                print("Checking if user exists by email")
                user = self.oauth_repo.get_user_by_email(user_data.email)
                
                if not user:
                    # Create new user
                    print("Creating new user")
                    user = self.oauth_repo.create_user(
                        UserCreate(email=user_data.email)
                    )
                
                # Create OAuth provider connection
                print("Creating OAuth provider connection")
                self.oauth_repo.create_oauth_provider(
                    OAuthProviderCreate(
                        user_id=user.id,
                        provider=user_data.provider,
                        provider_user_id=user_data.provider_id,
                        provider_payload=user_data.dict()
                    )
                )
            else:
                # Update existing OAuth provider
                print("Updating existing OAuth provider")
                oauth_provider = self.oauth_repo.get_oauth_provider(
                    user.id,
                    OAuthProvider(self.provider)
                )
                if oauth_provider:
                    self.oauth_repo.update_oauth_provider(
                        oauth_provider,
                        user_data.dict()
                    )
            
            updated_user = self.oauth_repo.get_user_by_id(user.id)
            return UserResponse(
                id=updated_user.id,
                email=updated_user.email,
                is_active=updated_user.is_active,
                is_deleted=updated_user.is_deleted,
                created_at=updated_user.created_at,
                updated_at=updated_user.updated_at,
                deleted_at=updated_user.deleted_at
            )

        except Exception as e:
            raise ValueError(f"In OAuth callback {str(e)}")