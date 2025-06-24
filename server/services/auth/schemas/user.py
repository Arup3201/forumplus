from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

# schemas for api requests

class UserProfileUpdate(BaseModel):
    id: str
    bio: Optional[str] = None
    interests: Optional[List[str]] = []
    location: Optional[str] = None
    
    class Config:
        extra = "forbid"

## schemas for database entities

class UserEntity(BaseModel):
    id: str
    email: str
    is_active: bool
    is_deleted: bool
    created_at: datetime
    updated_at: datetime
    deleted_at: Optional[datetime]

class UserProfileEntity(BaseModel):
    id: str
    user_id: str
    username: str
    display_name: Optional[str]
    bio: Optional[str]
    avatar_url: Optional[str]
    website: Optional[str]
    location: Optional[str]
    role: str
    last_seen_at: Optional[datetime]
    post_count: int
    reputation: int
    created_at: datetime
    updated_at: datetime
    
## schemas for api responses

class UserResponse(BaseModel):
    id: str
    email: str
    is_active: bool
    is_deleted: bool
    created_at: datetime
    updated_at: datetime

class UserProfileResponse(BaseModel):
    id: str
    user_id: str
    username: str
    display_name: Optional[str]
    avatar_url: Optional[str]
    bio: Optional[str]
    website: Optional[str]
    location: Optional[str]
    last_seen_at: Optional[datetime]
    post_count: int
    reputation: int
    created_at: datetime
    updated_at: datetime