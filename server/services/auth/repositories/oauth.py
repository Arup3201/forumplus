from sqlalchemy.orm import Session
from shared.repository import BaseRepository
from typing import Dict, List
from services.auth.models import User, OAuthProvider
from services.auth.schemas import OAuthProviderEntity, UserEntity

class OAuthRepository(BaseRepository):
    def __init__(self, db_session: Session):
        super().__init__(db_session)
    
    def _to_oauth_provider_entity(self, oauth_provider: OAuthProvider) -> OAuthProviderEntity:
        provider_dict = {
            'id': oauth_provider.id,
            'user_id': oauth_provider.user_id,
            'provider': oauth_provider.provider,
            'provider_id': oauth_provider.provider_user_id,
            'provider_payload': oauth_provider.provider_payload,
            'created_at': oauth_provider.created_at,
            'updated_at': oauth_provider.updated_at
        }
        return OAuthProviderEntity(**provider_dict)
    
    def _to_user_entity(self, user: User) -> UserEntity:
        user_dict = {
            'id': user.id,
            'email': user.email,
            'is_active': user.is_active,
            'is_deleted': user.is_deleted,
            'created_at': user.created_at,
            'updated_at': user.updated_at,
            'deleted_at': user.deleted_at
        }
        return UserEntity(**user_dict)
    
    def create_oauth_provider(self, user_id: str, provider_data: Dict) -> OAuthProviderEntity:
        oauth_provider = OAuthProvider(**{
            **self._get_base_payload(),
            'user_id': user_id,
            'provider': provider_data['provider'],
            'provider_user_id': provider_data['provider_id'],
            'provider_payload': provider_data,
        })
        self.db_session.add(oauth_provider)
        self.db_session.flush()
        return self._to_oauth_provider_entity(oauth_provider)
    
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
    
    def add_oauth_provider(self, user_id: str, oauth_provider_id: str) -> None:
        oauth_provider = self.db_session.query(OAuthProvider).filter(OAuthProvider.id == oauth_provider_id).first()
        if not oauth_provider:
            raise ValueError(f"OAuth provider with id {oauth_provider_id} not found")
        
        user = self.db_session.query(User).filter(User.id == user_id).first()
        if not user:
            raise ValueError(f"User with id {user_id} not found")
        
        user.oauth_providers.append(oauth_provider)
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
        
    def get_oauth_providers_by_user_id(self, user_id: str) -> List[OAuthProviderEntity]:
        oauth_providers = self.db_session.query(User).filter(User.id == user_id).first().oauth_providers
        oauth_providers_list = []
        for oauth_provider in oauth_providers:
            oauth_providers_list.append(self._to_oauth_provider_entity(oauth_provider))
        return oauth_providers_list