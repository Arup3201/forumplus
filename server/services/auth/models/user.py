from sqlalchemy.orm import relationship
from sqlalchemy import Column, String, Boolean, DateTime
from shared.model import Base
from shared.mixins import TimestampMixin

class User(Base, TimestampMixin):
    __tablename__ = 'users'

    id = Column(String(36), primary_key=True)
    email = Column(String(255), unique=True, nullable=False)
    is_active = Column(Boolean, default=True)
    is_deleted = Column(Boolean, default=False)
    deleted_at = Column(DateTime(timezone=True), nullable=True)

    # Relationships
    oauth_providers = relationship("OAuthProvider", back_populates="user")
    threads = relationship("Thread", back_populates="author")
