from sqlalchemy.orm import relationship
from sqlalchemy import Column, String, ForeignKey, JSON, UniqueConstraint
from shared.model import Base
from shared.mixins import TimestampMixin

class OAuthProvider(Base, TimestampMixin):
    __tablename__ = 'oauth_providers'

    id = Column(String(36), primary_key=True)
    user_id = Column(String(36), ForeignKey('users.id'), nullable=False)
    provider = Column(String(50), nullable=False)  # e.g., 'google', 'github', 'facebook'
    provider_user_id = Column(String(255), nullable=False)  # ID from the provider
    provider_payload = Column(JSON, nullable=False)  # Store provider-specific data

    # Relationship with User
    user = relationship("User", back_populates="oauth_providers")

    # Ensure one provider account per user
    __table_args__ = (
        UniqueConstraint('user_id', 'provider', name='uix_user_provider'),
    )