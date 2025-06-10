from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, String, DateTime, JSON, Boolean
from shared.mixins import TimestampMixin

Base = declarative_base()

class Session(Base, TimestampMixin):
    __tablename__ = "sessions"
    
    id = Column(String(36), primary_key=True)
    session_id = Column(String(255), nullable=False)
    user_id = Column(String(36), nullable=False)
    last_accessed_at = Column(DateTime(timezone=True), nullable=False)
    expires_at = Column(DateTime(timezone=True), nullable=False)
    ip_address = Column(String(45), nullable=False)
    user_agent = Column(String(255), nullable=False)
    device_info = Column(JSON, nullable=False)
    is_active = Column(Boolean, default=True)
    logout_at = Column(DateTime(timezone=True), nullable=True)