from fastapi import APIRouter, Request, HTTPException
from authlib.integrations.starlette_client import OAuth
import secrets
from typing import Dict, Any
from datetime import datetime, timezone, timedelta
from env import settings
from auth.schemas import OAuthState

router = APIRouter()

oauth = OAuth()
oauth.register(
    name='google',
    client_id=settings.GOOGLE_CLIENT_ID,
    client_secret=settings.GOOGLE_CLIENT_SECRET,
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    client_kwargs={'scope': 'openid email profile'}
)
oauth.register(
    name='github',
    client_id=settings.GITHUB_CLIENT_ID,
    client_secret=settings.GITHUB_CLIENT_SECRET,
    access_token_url='https://github.com/login/oauth/access_token',
    authorize_url='https://github.com/login/oauth/authorize',
    api_base_url='https://api.github.com/',
    client_kwargs={'scope': 'user:email'}
)

oauth_state_db: Dict[str, OAuthState] = {}

def generate_state():
    """Get the security state for OAuth.

    Returns:
        str: The security state.
    """
    return secrets.token_urlsafe(32)

def store_oauth_state(provider: str, state: str) -> None:
    """stores the oauth state variable for CSRF protection

    Args:
        state (str): random url safe state value
    """
    oauth_state_db[state] = OAuthState(**{
        'provider': provider, 
        'created_at': datetime.now(tz=timezone.utc), 
        'expires_at': datetime.now(tz=timezone.utc) + timedelta(minutes=10) # expires in 10 minutes
    })

def verify_and_consume_state(state: str, provider: str) -> bool:
    """Verify the state parameter against the session.

    Args:
        provider (str): The provider of the authentication.
        state (str): The state parameter to verify.

    Raises:
        ValueError: If the state does not match the session state.
    """
    if not state or state not in oauth_state_db:
        return False
    
    oauth_state_info = oauth_state_db[state]
    
    if oauth_state_info.expires_at < datetime.now(tz=timezone.utc):
        return False
    
    if oauth_state_info.provider != provider:
        return False
    
    del oauth_state_db[state]
    return True

@router.get("/{provider}")
async def oauth_login(provider: str, request: Request):
    """
    Initiates the OAuth login process for the specified provider.
    """
    if provider not in ['google', 'github']:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported provider: {provider}"
        )

    # Generate CSRF protection state
    state = generate_state()  # Creates secure random string
    store_oauth_state(provider, state)  # Store in oauth db

    # Create OAuth client and redirect to provider
    client = oauth.create_client(provider)
    redirect_uri = f"http://localhost:8000/oauth/{provider}/callback"

    return await client.authorize_redirect(request, redirect_uri, state=state)

@router.get("/{provider}/callback")
async def oauth_callback(provider: str, request: Request):
    """
    Handles the OAuth callback from the specified provider.
    """
    if provider not in ['google', 'github']:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported provider: {provider}"
        )

    # verify the state parameter
    state = request.query_params.get("state")
    if not state or not verify_and_consume_state(state, provider):
        raise HTTPException(
            status_code=400,
            detail="Missing or invalid state parameter in callback."
        )

    client = oauth.create_client(provider)

    try:
        token = await client.authorize_access_token(request)
        
        if provider == 'google':
            resp = await client.get('/userinfo', token=token).json()
            user_info = resp.json()

            user_data = {
                'provider_id': user_info['sub'],
                'email': user_info['email'],
                'name': user_info['name'],
                'avatar_url': user_info.get('picture'),
                'provider': 'google'
            }
            
        elif provider == 'github':
            user_info = await client.get('user').json()
            
            emails = await client.get('user/emails').json()
            primary_email = next((email for email in emails if email.get('primary')), None)
            user_data = {
                'provider_id': user_info['id'],
                'email': primary_email['email'] if primary_email else None,
                'name': user_info['name'] or user_info['login'],
                'avatar_url': user_info['avatar_url'],
                'provider': 'github'
            }

        print(f"User data from {provider}: {user_data}")
    
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"OAuth callback failed: {str(e)}"
        )