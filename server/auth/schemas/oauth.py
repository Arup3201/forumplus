from pydantic import BaseModel
from datetime import datetime

class OAuthState(BaseModel):
    provider: str
    created_at: datetime
    expires_at: datetime