from fastapi import APIRouter, Depends, Request
from shared.database import DatabaseManager, get_db_manager
from services.auth.services.user import UserService
from services.auth.schemas import UserResponse, UserProfileResponse

router = APIRouter()

@router.get('/me')
def get_user_me(request: Request, db_manager: DatabaseManager = Depends(get_db_manager)):
    user_service = UserService(db_manager)
    user_id = request.state.user_id
    
    user = user_service.get_user(user_id)
    return UserResponse(**user)

@router.get('/{user_id}/profile', response_model=UserProfileResponse)
def get_user_profile(user_id: str, db_manager: DatabaseManager = Depends(get_db_manager)):
    user_service = UserService(db_manager)
    user_profile = user_service.get_user_profile(user_id)
    return UserProfileResponse(**user_profile)

