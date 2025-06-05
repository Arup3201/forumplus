from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, Dict
from services.auth.types import OAuthProvider

class UserBase(BaseModel):
    email: EmailStr
    is_active: bool = True
    is_deleted: bool = False

class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    id: str
    created_at: datetime
    updated_at: datetime
    deleted_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class OAuthProviderBase(BaseModel):
    provider: OAuthProvider
    provider_user_id: str
    provider_payload: Dict

class OAuthProviderCreate(OAuthProviderBase):
    user_id: str

class OAuthProviderResponse(OAuthProviderBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class OAuthUserData(BaseModel):
    provider_id: str
    email: str
    name: str
    avatar_url: Optional[str] = None
    provider: OAuthProvider
