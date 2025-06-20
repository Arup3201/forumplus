from pydantic import BaseModel
from datetime import datetime

class SessionEntity(BaseModel):
    id: str
    session_id: str
    user_id: str
    ip_address: str
    user_agent: str
    device_info: dict
    is_active: bool
    logout_at: datetime | None = None
    expires_at: datetime
    last_accessed_at: datetime