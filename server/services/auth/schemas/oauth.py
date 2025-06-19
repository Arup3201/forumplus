from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from services.auth.types import OAuthProvider

# schemas for database entities
class OAuthProviderEntity(BaseModel):
    id: str
    user_id: str
    provider: str
    provider_id: str
    provider_payload: dict
    created_at: datetime
    updated_at: datetime

# schemas for OAuth client response
class OAuthClientResponse(BaseModel):
    provider_id: str
    email: str
    name: str
    avatar_url: str
    provider: OAuthProvider
