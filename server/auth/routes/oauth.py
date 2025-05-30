from fastapi import APIRouter, Request, HTTPException
from authlib.integrations.starlette_client import OAuth
import secrets
from env import settings

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

def generate_state():
    """Get the security state for OAuth.

    Returns:
        str: The security state.
    """
    return secrets.token_urlsafe(32)

def verify_state(request: Request, state: str):
    """Verify the state parameter against the session.

    Args:
        request (Request): The request object.
        state (str): The state parameter to verify.

    Raises:
        ValueError: If the state does not match the session state.
    """
    session_state = request.session.get("oauth_state")
    return session_state == state

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
    request.session["oauth_state"] = state  # Store in session

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
    if not state or not verify_state(request, state):
        raise HTTPException(
            status_code=400,
            detail="Missing or invalid state parameter in callback."
        )

    client = oauth.create_client(provider)

    try:
        token = client.authorize_access_token(request)
        
        if provider == 'google':
            user_info = token.get('userinfo')
            if not user_info:
                resp = await client.get('userinfo').json()
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