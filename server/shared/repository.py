from shared.database import DatabaseManager
from datetime import datetime, timezone
from typing import Dict
import uuid
from shared.model import Session
from shared.schema import SessionEntity

class BaseRepository:
    def __init__(self, db_manager: DatabaseManager):
        self.db_manager = db_manager

    def _get_base_payload(self) -> Dict:
        return {
            "id": str(uuid.uuid4()),
            "created_at": datetime.now(tz=timezone.utc),
            "updated_at": datetime.now(tz=timezone.utc),
        }
        
class SessionRepository(BaseRepository):
    def __init__(self, db_manager: DatabaseManager):
        super().__init__(db_manager)
        
    def create_session(self, user_data: Dict) -> SessionEntity:
        with self.db_manager.get_session() as db_session:
            session = Session(
                **self._get_base_payload(),
                session_id=user_data['session_id'],
                user_id=user_data['user_id'],
                ip_address=user_data['ip_address'],
                user_agent=user_data['user_agent'],
                device_info=user_data['device_info'],
                expires_at=user_data['expires_at'],
                is_active=user_data['is_active'],
                last_accessed_at=datetime.now(tz=timezone.utc),
            )
            db_session.add(session)
            db_session.flush()
            session_dict = {
                "id": session.id,
                "session_id": session.session_id,
                "user_id": session.user_id,
                "ip_address": session.ip_address,
                "user_agent": session.user_agent,
                "device_info": session.device_info,
                "is_active": session.is_active,
                "logout_at": session.logout_at,
                "expires_at": session.expires_at,
                "last_accessed_at": session.last_accessed_at,
            }
            return SessionEntity(**session_dict)
        
    def get_session(self, session_id: str) -> SessionEntity | None:
        with self.db_manager.get_session() as db_session:
            session = db_session.query(Session).filter(Session.session_id == session_id).order_by(Session.created_at.desc()).first()
            if not session:
                return None
            session_dict = {
                "id": session.id,
                "session_id": session.session_id,
                "user_id": session.user_id,
                "ip_address": session.ip_address,
                "user_agent": session.user_agent,
                "device_info": session.device_info,
                "is_active": session.is_active,
                "logout_at": session.logout_at,
                "expires_at": session.expires_at,
                "last_accessed_at": session.last_accessed_at,
            }
            return SessionEntity(**session_dict)
    
    def get_last_active_session_by_user_id(self, user_id: str) -> SessionEntity | None:
        with self.db_manager.get_session() as db_session:
            session = db_session.query(Session).filter(Session.user_id == user_id, Session.is_active == True).order_by(Session.created_at.desc()).first()
            if not session:
                return None
            session_dict = {
                "id": session.id,
                "session_id": session.session_id,
                "user_id": session.user_id,
                "ip_address": session.ip_address,
                "user_agent": session.user_agent,
                "device_info": session.device_info,
                "is_active": session.is_active,
                "logout_at": session.logout_at,
                "expires_at": session.expires_at,
                "last_accessed_at": session.last_accessed_at,
            }
            return SessionEntity(**session_dict)
    
    def update_session(self, session_id: str, user_data: Dict) -> SessionEntity:
        with self.db_manager.get_session() as db_session:
            session = db_session.query(Session).filter(Session.session_id == session_id).first()
            if not session:
                raise ValueError("Session not found")
            
            for key, value in user_data.items():
                setattr(session, key, value)
            session.updated_at = datetime.now(tz=timezone.utc)
            
            db_session.flush()
            session_dict = {
                "id": session.id,
                "session_id": session.session_id,
                "user_id": session.user_id,
                "ip_address": session.ip_address,
                "user_agent": session.user_agent,
                "device_info": session.device_info,
                "is_active": session.is_active,
                "logout_at": session.logout_at,
                "expires_at": session.expires_at,
                "last_accessed_at": session.last_accessed_at,
            }
            return SessionEntity(**session_dict)