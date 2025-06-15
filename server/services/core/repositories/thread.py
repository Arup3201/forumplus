from sqlalchemy.orm import Session
from typing import Dict
from datetime import datetime, timezone
from services.core.models import Thread
from services.core.schemas import ThreadEntity
from shared.repository import BaseRepository

class ThreadRepository(BaseRepository):
    def __init__(self, db_session: Session):
        super().__init__(db_session)

    def _to_entity(self, thread: Thread) -> ThreadEntity:
        thread_dict = {
            "id": thread.id,
            "title": thread.title,
            "content": thread.content,
            "content_plain": thread.content_plain,
            "content_type": thread.content_type,
            "is_edited": thread.is_edited,
            "edit_count": thread.edit_count,
            "category_id": thread.category_id,
            "author_id": thread.author_id,
            "last_edited_by_id": thread.last_edited_by_id,
            "last_activity_at": thread.last_activity_at,
            "created_at": thread.created_at,
            "updated_at": thread.updated_at
        }
        return ThreadEntity(**thread_dict)

    def create_thread(self, thread_dict: Dict):
        thread = Thread(**{
            **self._get_base_payload(),
            'title': thread_dict['title'],
            'content': thread_dict['content'],
            'content_plain': thread_dict['content_plain'],
            'content_type': thread_dict['content_type'],
            'is_edited': False,
            'edit_count': 0,
            'category_id': thread_dict['category_id'],
            'author_id': thread_dict['author_id'],
            'last_edited_by_id': thread_dict['author_id'],
            'last_activity_at': datetime.now(timezone.utc)
        })
        self.db_session.add(thread)
        return self._to_entity(thread)

    def get_thread(self, thread_id: str):
        pass