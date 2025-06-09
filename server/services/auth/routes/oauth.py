from fastapi import APIRouter, Request, HTTPException, Depends
from shared.database import DatabaseManager, get_db_manager
from services.auth.types import OAuthProvider
from services.auth.services import OAuthService

router = APIRouter()

@router.get("/{provider}")
async def oauth_login(provider: OAuthProvider, 
                      request: Request,
                      db_manager: DatabaseManager = Depends(get_db_manager)):
    """
    Initiates the OAuth login process for the specified provider.
    """
    if provider not in ['google', 'github']:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported provider: {provider}"
        )

    try:
        service = OAuthService(db_manager, provider)
        return await service.oauth_login(request)
    except Exception as e:
        raise HTTPException(
            status_code=400, 
            detail=f"Error in oauth_login: {str(e)}"
        )

@router.get("/{provider}/callback")
async def oauth_callback(provider: OAuthProvider, 
                         request: Request,
                         db_manager: DatabaseManager = Depends(get_db_manager)):
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
        service = OAuthService(db_manager, provider)
        session_id = await service.oauth_callback(state, request)
        return session_id
    except Exception as e:
        raise HTTPException(
            status_code=400, 
            detail=f"Error in oauth_callback: {str(e)}"
        )