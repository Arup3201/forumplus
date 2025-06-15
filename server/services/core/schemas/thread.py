from pydantic import BaseModel
from datetime import datetime

## schemas for routes

class ThreadCategory(BaseModel):
    name: str
    description: str

class ThreadRequest(BaseModel):
    title: str
    category_id: str
    content: str
    user_id: str
    
## schemas for entities

class ThreadEntity(BaseModel):
    id: str
    title: str
    content: str
    content_plain: str
    content_type: str
    is_edited: bool
    edit_count: int
    category_id: str
    author_id: str
    last_edited_by_id: str
    last_activity_at: datetime
    created_at: datetime
    updated_at: datetime