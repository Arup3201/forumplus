from sqlalchemy.orm import relationship
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, JSON, UniqueConstraint
from datetime import datetime, timezone

from shared.model import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(String(36), primary_key=True)
    email = Column(String(255), unique=True, nullable=False)
    is_active = Column(Boolean, default=True)
    is_deleted = Column(Boolean, default=False)
    created_at = Column(DateTime)
    updated_at = Column(DateTime, onupdate=datetime.now(timezone.utc))
    deleted_at = Column(DateTime, nullable=True)

    # Relationship with OAuth providers
    oauth_providers = relationship("OAuthProvider", back_populates="user")

class OAuthProvider(Base):
    __tablename__ = 'oauth_providers'

    id = Column(String(36), primary_key=True)
    user_id = Column(String(36), ForeignKey('users.id'), nullable=False)
    provider = Column(String(50), nullable=False)  # e.g., 'google', 'github', 'facebook'
    provider_user_id = Column(String(255), nullable=False)  # ID from the provider
    provider_payload = Column(JSON, nullable=False)  # Store provider-specific data
    created_at = Column(DateTime)
    updated_at = Column(DateTime, onupdate=datetime.now(timezone.utc))

    # Relationship with User
    user = relationship("User", back_populates="oauth_providers")

    # Ensure one provider account per user
    __table_args__ = (
        UniqueConstraint('user_id', 'provider', name='uix_user_provider'),
    )