from fastapi import APIRouter

router = APIRouter()

@router.get('/me')
def get_user_me():
    return {"message": "Hello, World!"}

@router.get('/profile')
def get_user_profile():
    return {"message": "Hello, World!"}

