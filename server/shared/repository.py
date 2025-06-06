from shared.session import DatabaseSessionManager
from datetime import datetime, timezone
from typing import Dict
import uuid

class BaseRepository:
    def __init__(self, db_manager: DatabaseSessionManager):
        self.db_manager = db_manager

    def _get_base_payload(self) -> Dict:
        return {
            "id": str(uuid.uuid4()),
            "created_at": datetime.now(tz=timezone.utc),
            "updated_at": datetime.now(tz=timezone.utc),
        }