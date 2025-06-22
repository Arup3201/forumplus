from fastapi import APIRouter

router = APIRouter()

@router.get('/me')
def get_user_me():
    return {"message": "Authenticated"}

@router.get('/{user_id}/profile')
def get_user_profile():
    return {"message": "Hello, World!"}

@router.get('/{user_id}/basic')
def get_user_basic():
    return {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "location": "New York, NY",
        "bio": "I'm a software engineer with a passion for building scalable and efficient systems.",
        "avatar": "https://via.placeholder.com/150",
        "created_at": "2021-01-01",
        "updated_at": "2021-01-01",
        "is_admin": True,
        "is_active": True,
        "is_verified": True,
    }

@router.get('/me/stats')
def get_user_me_stats():
    return {"message": "Authenticated"}

@router.get('/{user_id}/stats')
def get_user_stats():
    return {
        "total_posts": 100,
        "total_followers": 1000,
        "total_following": 1000,
    }

@router.get('/{user_id}/activity')
def get_user_activity(page: int = 1, limit: int = 10, type: str = "post", sort: str = "desc"):
    return {
        "activity": {
            "posts": [
                {
                    "title": "My First Post",
                    "content": "This is the content of my first post.",
                    "created_at": "2021-01-01",
                    "updated_at": "2021-01-01",
                }
            ],
        }, 
        "pagination": {
            "total": 100,
            "page": page,
            "limit": limit,
            "has_next": True
        }
    }

@router.get('/{user_id}/posts')
def get_user_posts(user_id: str, page: int = 1, limit: int = 10):
    return {
        "posts": [
            {
                "title": "My First Post",
                "content": "This is the content of my first post.",
                "created_at": "2021-01-01",
                "updated_at": "2021-01-01",
            }
        ],
        "pagination": {
            "total": 100,
            "page": page,
            "limit": limit,
            "has_next": True
        }
    }

@router.patch('/{user_id}/username')
def update_user_username(user_id: str, username: str):
    return {"message": "User username updated"}

@router.patch('/{user_id}/profile')
def update_user_profile(user_id: str, user: User):
    return {"message": "User updated"}

@router.patch('/{user_id}/avatar')
def update_user_avatar(user_id: str, avatar: str):
    return {"message": "User avatar updated"}

@router.delete('/{user_id}/avatar')
def delete_user_avatar(user_id: str):
    return {"message": "User avatar deleted"}

