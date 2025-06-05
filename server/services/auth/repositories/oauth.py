from shared.database.session import DatabaseSessionManager
from services.auth.models.oauth import User, OAuthProvider
from services.auth.schemas.oauth import UserCreate, OAuthProviderCreate, OAuthUserData
from services.auth.types import OAuthProvider as OAuthProviderType
from sqlalchemy import select
from datetime import datetime, timezone
import uuid

class OAuthRepository:
    def __init__(self, db_manager: DatabaseSessionManager):
        self.db_manager = db_manager

    def get_user_by_id(self, user_id: str) -> User | None:
        """Get a user by their ID."""
        with self.db_manager.get_session() as session:
            result = session.execute(
                select(User).where(User.id == user_id)
            )
            return result.scalar_one_or_none()

    def get_user_by_email(self, email: str) -> User | None:
        """Get a user by their email address."""
        with self.db_manager.get_session() as session:
            result = session.execute(
                select(User).where(User.email == email)
            )
            return result.scalar_one_or_none()

    def get_user_by_provider_id(self, provider: OAuthProviderType, provider_id: str) -> User | None:
        """Get a user by their OAuth provider ID."""
        with self.db_manager.get_session() as session:
            result = session.execute(
                select(User)
                .join(OAuthProvider)
                .where(
                    OAuthProvider.provider == provider.value,
                    OAuthProvider.provider_user_id == provider_id
                )
            )
            return result.scalar_one_or_none()

    def create_user(self, user_data: UserCreate) -> User:
        """Create a new user."""
        with self.db_manager.get_session() as session:
            user = User(
                id=str(uuid.uuid4()),
                email=user_data.email,
                is_active=user_data.is_active,
                is_deleted=user_data.is_deleted,
                created_at=datetime.now(timezone.utc),
                updated_at=datetime.now(timezone.utc)
            )
            session.add(user)
            session.commit()
            session.refresh(user)
            return user

    def create_oauth_provider(self, oauth_data: OAuthProviderCreate) -> OAuthProvider:
        """Create a new OAuth provider connection for a user."""
        with self.db_manager.get_session() as session:
            oauth_provider = OAuthProvider(
                id=str(uuid.uuid4()),
                user_id=oauth_data.user_id,
                provider=oauth_data.provider.value,
                provider_user_id=oauth_data.provider_user_id,
                provider_payload=oauth_data.provider_payload,
                created_at=datetime.now(timezone.utc),
                updated_at=datetime.now(timezone.utc)
            )
            session.add(oauth_provider)
            session.commit()
            session.refresh(oauth_provider)
            return oauth_provider

    def get_oauth_provider(
        self,
        user_id: str,
        provider: OAuthProviderType
    ) -> OAuthProvider | None:
        """Get a user's OAuth provider connection."""
        with self.db_manager.get_session() as session:
            result = session.execute(
                select(OAuthProvider)
                .where(
                    OAuthProvider.user_id == user_id,
                    OAuthProvider.provider == provider.value
                )
            )
            return result.scalar_one_or_none()

    def update_oauth_provider(
        self,
        oauth_provider: OAuthProvider,
        provider_payload: dict
    ) -> OAuthProvider:
        """Update an existing OAuth provider connection."""
        with self.db_manager.get_session() as session:
            oauth_provider.provider_payload = provider_payload
            oauth_provider.updated_at = datetime.now(timezone.utc)
            
            session.commit()
            session.refresh(oauth_provider)
            return oauth_provider
