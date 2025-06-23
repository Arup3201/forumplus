from shared.database import DatabaseManager
from services.auth.repositories.user import UserRepository
from typing import Dict

class UserService:
    def __init__(self, db_manager: DatabaseManager):
        self.db_manager = db_manager

    def get_user(self, user_id: str) -> Dict:
        with self.db_manager.get_session() as db_session:
            user_repo = UserRepository(db_session)
            user = user_repo.get_user(user_id)
            return {
                'id': user.id,
                'email': user.email,
                'is_active': user.is_active,
                'is_deleted': user.is_deleted,
                'created_at': user.created_at,
                'updated_at': user.updated_at
            }

    def get_user_profile(self, user_id: str) -> Dict:
        with self.db_manager.get_session() as db_session:
            user_repo = UserRepository(db_session)
            user_profile = user_repo.get_user_profile(user_id)
            return {
                'id': user_profile.id,
                'user_id': user_profile.user_id,
                'username': user_profile.username,
                'display_name': user_profile.display_name,
                'avatar_url': user_profile.avatar_url,
                'bio': user_profile.bio,
                'website': user_profile.website,
                'location': user_profile.location,
                'last_seen_at': user_profile.last_seen_at,
                'post_count': user_profile.post_count,
                'reputation': user_profile.reputation,
                'created_at': user_profile.created_at,
                'updated_at': user_profile.updated_at
            }
