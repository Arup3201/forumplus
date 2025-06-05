from fastapi import APIRouter, Request, HTTPException
from auth.types import OAuthProvider
from auth.services import OAuthService

router = APIRouter()

@router.get("/{provider}")
async def oauth_login(provider: OAuthProvider, request: Request):
    """
    Initiates the OAuth login process for the specified provider.
    """
    if provider not in ['google', 'github']:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported provider: {provider}"
        )

    service = OAuthService(provider)
    return await service.oauth_login(request)

@router.get("/{provider}/callback")
async def oauth_callback(provider: OAuthProvider, request: Request):
    """
    Handles the OAuth callback from the specified provider.
    """
    if provider not in ['google', 'github']:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported provider: {provider}"
        )
    
    state = request.query_params.get('state')
    try:
        service = OAuthService(provider)
        user = await service.oauth_callback(state, request)
        return user
    except Exception as e:
        return HTTPException(
            status_code=400, 
            detail=str(e)
        )