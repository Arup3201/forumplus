from sqlalchemy.orm import Session
from shared.repository import BaseRepository
from services.auth.models import User, UserProfile, UserRole
from services.auth.schemas import UserEntity, UserProfileEntity
from datetime import datetime, timezone
from typing import Dict

class UserRepository(BaseRepository):
    def __init__(self, db_session: Session):
        super().__init__(db_session)

    def _to_user_entity(self, user: User) -> UserEntity:
        user_dict = {
            'id': user.id,
            'email': user.email,
            'is_active': user.is_active,
            'is_deleted': user.is_deleted,
            'deleted_at': user.deleted_at,
            'created_at': user.created_at,
            'updated_at': user.updated_at
        }
        return UserEntity(**user_dict)
    
    def _to_user_profile_entity(self, user_profile: UserProfile) -> UserProfileEntity:
        user_profile_dict = {
            'id': user_profile.id,
            'user_id': user_profile.user_id,
            'username': user_profile.username,
            'display_name': user_profile.display_name,
            'bio': user_profile.bio,
            'avatar_url': user_profile.avatar_url,
            'website': user_profile.website,
            'location': user_profile.location,
            'role': user_profile.role,
            'last_seen_at': user_profile.last_seen_at,
            'post_count': user_profile.post_count,
            'reputation': user_profile.reputation,
            'created_at': user_profile.created_at,
            'updated_at': user_profile.updated_at
        }
        return UserProfileEntity(**user_profile_dict)
    
    def create_user(self, user_data: Dict) -> UserEntity:
        user = User(**{
            **self._get_base_payload(),
            'email': user_data['email'], 
            'is_active': True, 
            'is_deleted': False,
            'deleted_at': None
        })
        self.db_session.add(user)
        self.db_session.flush()
        return self._to_user_entity(user)
    
    def create_user_profile(self, user_id: str, user_data: Dict) -> UserProfileEntity:
        user_profile = UserProfile(**{
            **self._get_base_payload(),
            'user_id': user_id,
            'username': user_data['username'],
            'display_name': user_data.get('display_name', ''),
            'avatar_url': user_data.get('avatar_url', ''),
            'bio': user_data.get('bio', ''),
            'website': user_data.get('website', ''),
            'location': user_data.get('location', ''),
            'last_seen_at': datetime.now(tz=timezone.utc),
            'role': UserRole.MEMBER
        })
        self.db_session.add(user_profile)
        self.db_session.flush()
        return self._to_user_profile_entity(user_profile)
    
    def add_user_profile(self, user_id: str, user_profile_id: str) -> None:
        user = self.db_session.query(User).filter(User.id == user_id).first()
        if not user:
            raise ValueError(f"User with id {user_id} not found")
        
        user_profile = self.db_session.query(UserProfile).filter(UserProfile.id == user_profile_id).first()
        if not user_profile:
            raise ValueError(f"User profile with id {user_profile_id} not found")
        
        user.profile = user_profile
        self.db_session.flush()
    
    def get_user(self, user_id: str) -> UserEntity | None:
        user = self.db_session.query(User).filter(User.id == user_id).first()
        if not user:
            return None
        return self._to_user_entity(user)
    
    def get_user_by_email(self, email: str) -> UserEntity | None:
        user = self.db_session.query(User).filter(User.email == email).first()
        if not user:
            return None
        return self._to_user_entity(user)
    
    def get_user_profile(self, user_id: str) -> UserProfileEntity | None:
        user_profile = self.db_session.query(UserProfile).filter(UserProfile.user_id == user_id).first()
        if not user_profile:
            return None
        return self._to_user_profile_entity(user_profile)
    
    def update_user_profile(self, user_id: str, profile_data: Dict) -> UserProfileEntity:
        user_profile = self.db_session.query(UserProfile).filter(UserProfile.user_id == user_id).first()
        if not user_profile:
            raise ValueError(f"User profile with id {user_id} not found")
        
        for key, value in profile_data.items():
            setattr(user_profile, key, value)
        self.db_session.flush()
        return self._to_user_profile_entity(user_profile)