from sqlalchemy.orm import relationship
from sqlalchemy import Column, String, DateTime, Text, Integer, Enum, ForeignKey, JSON
from shared.model import Base
from shared.mixins import TimestampMixin
import enum

class UserRole(str, enum.Enum):
    ADMIN = "admin"
    MODERATOR = "moderator"
    MEMBER = "member"
    GUEST = "guest"

class UserProfile(Base, TimestampMixin):
    __tablename__ = 'user_profiles'

    id = Column(String(36), primary_key=True)
    user_id = Column(String(36), ForeignKey('users.id'), nullable=False, unique=True)
    
    # Profile Information
    username = Column(String(50), unique=True, nullable=False)
    display_name = Column(String(100), nullable=True)
    bio = Column(Text, nullable=True)
    avatar_url = Column(String(500), nullable=True)
    website = Column(String(255), nullable=True)
    location = Column(String(100), nullable=True)
    interests = Column(JSON, nullable=True)
    
    # Role & Permissions
    role = Column(Enum(UserRole), default=UserRole.MEMBER)
    
    # Activity Tracking
    last_seen_at = Column(DateTime(timezone=True), nullable=True)
    post_count = Column(Integer, default=0)
    reputation = Column(Integer, default=0)
    
    # Relationship back to auth user
    auth_user = relationship("User", back_populates="profile")
