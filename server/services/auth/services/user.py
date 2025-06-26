from shared.database import DatabaseManager
from services.auth.repositories import UserRepository
from typing import Dict

class UserService:
    def __init__(self, db_manager: DatabaseManager):
        self.db_manager = db_manager

    def get_user(self, user_id: str) -> Dict:
        with self.db_manager.get_session() as db_session:
            user_repo = UserRepository(db_session)
            user = user_repo.get_user(user_id)
            user_profile = user_repo.get_user_profile(user_id)
            return {
                'id': user.id,
                'email': user.email,
                'username': user_profile.username,
                'avatar_url': user_profile.avatar_url,
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
                'interests': user_profile.interests,
                'last_seen_at': user_profile.last_seen_at,
                'post_count': user_profile.post_count,
                'reputation': user_profile.reputation,
                'created_at': user_profile.created_at,
                'updated_at': user_profile.updated_at
            }

    def update_user_profile(self, user_id: str, profile_data: Dict) -> Dict:
        # Validate and sanitize input
        user_profile_dict = {}
        if 'display_name' in profile_data and profile_data['display_name'] is not None:
            user_profile_dict['display_name'] = profile_data['display_name'].strip()
        if 'username' in profile_data and profile_data['username'] is not None:
            user_profile_dict['username'] = profile_data['username'].strip()
        if 'bio' in profile_data and profile_data['bio'] is not None:
            user_profile_dict['bio'] = profile_data['bio'].strip()
        if 'interests' in profile_data and profile_data['interests'] is not None:
            user_profile_dict['interests'] = profile_data['interests']
        if 'location' in profile_data and profile_data['location'] is not None:
            user_profile_dict['location'] = profile_data['location'].strip()
        
        with self.db_manager.get_session() as db_session:
            user_repo = UserRepository(db_session)
            user_profile = user_repo.update_user_profile(user_id, user_profile_dict)
            return {
                'id': user_profile.id,
                'user_id': user_profile.user_id,
                'username': user_profile.username,
                'display_name': user_profile.display_name,
                'avatar_url': user_profile.avatar_url,
                'bio': user_profile.bio,
                'website': user_profile.website,
                'location': user_profile.location,
                'interests': user_profile.interests,
                'last_seen_at': user_profile.last_seen_at,
                'post_count': user_profile.post_count,
                'reputation': user_profile.reputation,
                'created_at': user_profile.created_at,
                'updated_at': user_profile.updated_at
            }