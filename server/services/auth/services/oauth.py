from authlib.integrations.starlette_client import OAuth
import secrets
from datetime import datetime, timezone, timedelta

# Environment variables
from shared.config import settings

# Types and Schemas
from fastapi import Request
from typing import Dict
from services.auth.types import OAuthProvider, OAuthState, OAuthStates, OAuthAppWrapper
from services.auth.schemas import OAuthClientResponse

# Database
from shared.database import DatabaseManager
from services.auth.services import SessionManager
from services.auth.repositories import OAuthRepository, UserRepository

# Constants
from shared.constant import SESSION_EXPIRATION_TIME, SESSION_EXPIRATION_UNIT

def generate_state(ip_address: str, user_agent: str, device_info: Dict) -> Dict:
    """Get the security state for OAuth.

    Returns:
        str: The security state.
    """
    return {
        "ip_address": ip_address,
        "user_agent": user_agent,
        "device_info": device_info, 
        "state": secrets.token_urlsafe(32)
    }

oauth_states: OAuthStates = {}

class OAuthService:
    def __init__(self, db_manager: DatabaseManager, provider: OAuthProvider):
        self.db_manager = db_manager
        self.provider = provider.value
        self.__init_oauth()
    
    @staticmethod
    def is_authenticated(db_manager: DatabaseManager, session_id: str) -> bool:
        with db_manager.get_session() as db_session:
            session_manager = SessionManager(db_session)
            if not session_manager.validate_session(session_id):
                return False
            
            return True
    
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
    
    def _store_oauth_state(self, state_info: Dict) -> None:
        """store the oauth state into global variable `oauth_states`

        Args:
            provider (str): The provider of the authentication.
            state (str): The state parameter to verify.
        """
        oauth_states[state_info['state']] = OAuthState(**{
            'ip_address': state_info['ip_address'],
            'user_agent': state_info['user_agent'],
            'device_info': state_info['device_info'],
            'provider': self.provider, 
            'created_at': datetime.now(tz=timezone.utc), 
            'expires_at': datetime.now(tz=timezone.utc) + timedelta(minutes=10) # expires in 10 minutes
        })

    def _verify_oauth_state(self, state: str) -> bool | OAuthState:
        """Verify the state parameter against the global variable `oauth_states`.

        Args:
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
        
        return oauth_state_info
    
    def _consume_oauth_state(self, state: str) -> OAuthState:
        """Consume the oauth state from the global variable `oauth_states`"""
        if not state or state not in oauth_states:
            raise ValueError("Missing or invalid state parameter in callback.")
        
        oauth_state_info = oauth_states[state]
        del oauth_states[state]
        return oauth_state_info
    
    async def oauth_login(self, request: Request):
        # get user ip address, user agent, and device info
        ip_address = request.client.host
        user_agent = request.headers.get('User-Agent')
        device_name = request.headers.get('Sec-Ch-Ua').split(";")[0].strip()
        device_version = request.headers.get('Sec-Ch-Ua').split(";")[1].strip()
        device_info = {
            "name": device_name,
            "version": device_version
        }
        
        # Generate CSRF protection state
        state_info = generate_state(ip_address, user_agent, device_info)  # Creates secure random string
        self._store_oauth_state(state_info)  # Store in oauth states dict

        # Create OAuth client and redirect to provider
        client = OAuthAppWrapper(self.oauth.create_client(self.provider))
        redirect_uri = f"http://localhost:8000/api/auth/oauth/{self.provider}/callback"

        return await client.authorize_redirect(request, redirect_uri, state_info['state'])
    
    async def _get_user_data_from_oauth_provider(self, client: OAuthAppWrapper, token: Dict) -> OAuthClientResponse:
        """Extract user data from OAuth provider response."""
        
        if self.provider == OAuthProvider.GOOGLE:
            resp = await client.get('https://www.googleapis.com/oauth2/v3/userinfo', token=token)
            user_info = resp.json()

            return OAuthClientResponse(
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
            
            return OAuthClientResponse(
                provider_id=str(user_info['id']),
                email=primary_email['email'],
                name=user_info['name'] or user_info['login'],
                avatar_url=user_info['avatar_url'],
                provider=OAuthProvider.GITHUB
            )
            
    def _create_session(self, session_manager: SessionManager, user_id: str, ip_address: str, user_agent: str, device_info: str) -> str:
        """Check if the user has an active session, if not create a new session otherwise delete the old session and create a new one"""
        
        session = session_manager.get_session_by_user_id(user_id)
        if session:
            session_manager.delete_session(session.session_id)
        
        session_id = session_manager.create_session({
            "session_id": secrets.token_urlsafe(32),
            "user_id": user_id,
            "ip_address": ip_address,
            "user_agent": user_agent,
            "device_info": device_info,
            "expires_at": datetime.now(tz=timezone.utc) + timedelta(**{
                SESSION_EXPIRATION_UNIT: SESSION_EXPIRATION_TIME
            }),
            "is_active": True
        })
        
        return session_id
    
    async def oauth_callback(self, state: str, request: Request) -> str:
        # verify the state parameter
        if not state or not self._verify_oauth_state(state):
            raise ValueError("Missing or invalid state parameter in callback.")

        # get user ip address, user agent, and device info
        state_info = self._consume_oauth_state(state)
        ip_address = state_info.ip_address
        user_agent = state_info.user_agent
        device_info = state_info.device_info

        client = OAuthAppWrapper(self.oauth.create_client(self.provider))

        try:
            token = await client.authorize_access_token(request)
            user_data = await self._get_user_data_from_oauth_provider(client, token)
            
            with self.db_manager.get_session() as db_session:
                session_manager = SessionManager(db_session)
                oauth_repo = OAuthRepository(db_session)
                user_repo = UserRepository(db_session)
                user_entity = user_repo.get_user_by_email(user_data.email)
            
                # if user does not exist, create a new user and add the oauth provider
                if not user_entity:
                    # create user
                    user_entity = user_repo.create_user(user_data.model_dump())
                    user_profile_entity = user_repo.create_user_profile(user_entity.id, {
                        'username': user_data['email'].split('@')[0],
                        'display_name': user_data['name'],
                        'avatar_url': user_data['avatar_url'],
                    })
                    user_repo.add_user_profile(user_entity.id, user_profile_entity.id)
                    
                    # create oauth provider
                    oauth_provider_entity = oauth_repo.create_oauth_provider(user_entity.id, user_data.model_dump())
                    oauth_repo.add_oauth_provider(user_entity.id, oauth_provider_entity.id)
                    
                    # create session
                    session_id = session_manager.create_session({
                        "session_id": secrets.token_urlsafe(32),
                        "user_id": user_entity.id,
                        "ip_address": ip_address,
                        "user_agent": user_agent,
                        "device_info": device_info,
                        "expires_at": datetime.now(tz=timezone.utc) + timedelta(**{
                            SESSION_EXPIRATION_UNIT: SESSION_EXPIRATION_TIME
                        }),
                        "is_active": True
                    })
                    
                    return session_id
                
                else:
                    oauth_providers = oauth_repo.get_oauth_providers_by_user_id(user_entity.id)
                    if self.provider not in [oauth_provider.provider for oauth_provider in oauth_providers]:
                        # if user exists but user never used this oauth provider before, add the oauth provider to the user
                        oauth_provider_entity = oauth_repo.create_oauth_provider(user_entity.id, user_data.model_dump())
                        oauth_repo.add_oauth_provider(user_entity.id, oauth_provider_entity.id)
                    
                    session_id = self._create_session(session_manager, user_entity.id, ip_address, user_agent, device_info)
                    return session_id

        except Exception as e:
            raise ValueError(f"In OAuth callback {str(e)}")