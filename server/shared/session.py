from shared.database import get_db_manager
from typing import Dict
from shared.repository import SessionRepository
from datetime import datetime, timezone

class SessionManager:
    def __init__(self, db_manager: get_db_manager):
        self.db_manager = db_manager
        self.session_repository = SessionRepository(db_manager)

    def create_session(self, user_data: Dict) -> str:
        """
        Create a new session for the user

        Args:
            user_data (Dict): User data to create the session

        Returns:
            str: Session ID
        """
        session = self.session_repository.create_session(user_data)
        return session.id
    
    def validate_session(self, session_id: str) -> bool:
        """
        Validate the session by checking expiration and not logged out

        Returns:
            bool: True if the session is valid, False otherwise
        """
        session = self.session_repository.get_session(session_id)
        if not session:
            return False
        
        if session.expires_at < datetime.now(tz=timezone.utc):
            return False
        
        if not session.is_active:
            return False
        
        return True
    
    def refresh_session(self, session_id: str) -> None:
        """
        Refresh the session by updating the last_accessed_at field

        Args:
            session_id (str): Session ID
        """
        self.session_repository.update_session(session_id, {"last_accessed_at": datetime.now(tz=timezone.utc)})
    
    def delete_session(self, session_id: str) -> None:
        """
        Delete the session by setting the logout_at field and is_active to False

        Args:
            session_id (str): Session ID
        """
        session = self.session_repository.get_session(session_id)
        if not session.is_active:
            print("Session is already logged out")
            return
        
        self.session_repository.update_session(session_id, {
            "logout_at": datetime.now(tz=timezone.utc), 
            "is_active": False
            })
    
    def get_session_by_user_id(self, user_id: str) -> str | None:
        """
        Get the session by user id

        Args:
            user_id (str): User ID
        """
        return self.session_repository.get_last_active_session_by_user_id(user_id)