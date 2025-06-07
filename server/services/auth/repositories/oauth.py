from server.shared.database import DatabaseManager
from shared.repository import BaseRepository
from typing import Dict, List
from services.auth.models.oauth import User, OAuthProvider
from services.auth.schemas.oauth import OAuthProviderEntity, UserEntity

class OAuthRepository(BaseRepository):
    def __init__(self, db_manager: DatabaseManager):
        super().__init__(db_manager)
    
    def create_oauth_provider(self, user_id: str, provider_data: Dict) -> OAuthProviderEntity:
        with self.db_manager.get_session() as session:
            oauth_provider = OAuthProvider(**{
                **self._get_base_payload(),
                'user_id': user_id,
                'provider': provider_data['provider'],
                'provider_user_id': provider_data['provider_id'],
                'provider_payload': provider_data,
            })
            session.add(oauth_provider)
            session.flush()
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
    
    def create_user(self, user_data: Dict) -> UserEntity:
        with self.db_manager.get_session() as session:
            user = User(**{
                **self._get_base_payload(),
                'email': user_data['email'], 
                'is_active': True, 
                'is_deleted': False,
                'deleted_at': None
            })
            session.add(user)
            session.flush()
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
    
    def add_oauth_provider(self, user_id: str, oauth_provider_id: str) -> None:
        with self.db_manager.get_session() as session:
            oauth_provider = session.query(OAuthProvider).filter(OAuthProvider.id == oauth_provider_id).first()
            if not oauth_provider:
                raise ValueError(f"OAuth provider with id {oauth_provider_id} not found")
            user = session.query(User).filter(User.id == user_id).first()
            if not user:
                raise ValueError(f"User with id {user_id} not found")
            user.oauth_providers.append(oauth_provider)
            session.flush()
    
    def get_user(self, user_id: str) -> UserEntity | None:
        with self.db_manager.get_session() as session:
            user = session.query(User).filter(User.id == user_id).first()
            if not user:
                return None
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
    
    def get_user_by_email(self, email: str) -> UserEntity | None:
        with self.db_manager.get_session() as session:
            user = session.query(User).filter(User.email == email).first()
            if not user:
                return None
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
        
    def get_oauth_providers_by_user_id(self, user_id: str) -> List[OAuthProviderEntity]:
        with self.db_manager.get_session() as session:
            oauth_providers = session.query(User).filter(User.id == user_id).first().oauth_providers
            oauth_providers_list = []
            for oauth_provider in oauth_providers:
                oauth_provider_dict = {
                    'id': oauth_provider.id,
                    'user_id': oauth_provider.user_id,
                    'provider': oauth_provider.provider,
                    'provider_id': oauth_provider.provider_user_id,
                    'provider_payload': oauth_provider.provider_payload,
                    'created_at': oauth_provider.created_at,
                    'updated_at': oauth_provider.updated_at
                }
                oauth_providers_list.append(OAuthProviderEntity(**oauth_provider_dict))
            return oauth_providers_list