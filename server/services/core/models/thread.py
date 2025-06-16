from sqlalchemy import Column, String, Text, DateTime, ForeignKey, Boolean, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from shared.model import Base, TimestampMixin

class ThreadCategory(Base, TimestampMixin):
    __tablename__ = "thread_categories"

    id = Column(String(36), primary_key=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    
    # Relationships
    threads = relationship("Thread", back_populates="category")

class Thread(Base, TimestampMixin):
    __tablename__ = "threads"

    # Basic Thread Information
    id = Column(String(36), primary_key=True)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    content_plain = Column(Text, nullable=True)
    content_type = Column(String(20), default="html")
    is_edited = Column(Boolean, default=False)
    edit_count = Column(Integer, default=0)

    # User Association
    author_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    last_edited_by_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    
    # Organization & Discovery
    category_id = Column(String(36), ForeignKey("thread_categories.id"), nullable=False)

    # Metadata
    last_activity_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    category = relationship("ThreadCategory", back_populates="threads")
    
