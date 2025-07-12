from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from contextlib import contextmanager
from typing import Generator
from threading import Lock
from functools import lru_cache
from shared.config import settings

class DatabaseManager:
    _lock = Lock()
    _instance = None
    
    def __new__(cls):
        with cls._lock:
            if cls._instance is None:
                cls._instance = super(DatabaseManager, cls).__new__(cls)
                cls._instance._initialized = False
            return cls._instance
    
    def __init__(self):
        if self._initialized:
            return
        
        database_url = f"postgresql://{settings.PG_USER}:{settings.PG_PASSWORD}@{settings.PG_HOST}:{settings.PG_PORT}/{settings.PG_DATABASE}"
        self.engine = create_engine(
            database_url,
            pool_size=10,
            max_overflow=30,
            pool_timeout=30,
            pool_recycle=1800,  # Recycle connections after 30 minutes
            echo=settings.SQL_ECHO
        )
        self.session_factory = sessionmaker(
            autocommit=False,
            autoflush=False,
            bind=self.engine
        )
        self._initialized = True

    @contextmanager
    def get_session(self) -> Generator[Session, None, None]:
        """
        Get a database session with automatic cleanup.
        Usage:
            with db.get_session() as session:
                result = session.query(User).all()
        """
        session = self.session_factory()
        try:
            yield session
            session.commit()
        except Exception:
            session.rollback()
            raise
        finally:
            session.close()

    def get_session_dependency(self) -> Generator[Session, None, None]:
        """
        FastAPI dependency for getting a database session.
        Usage:
            @app.get("/users")
            def get_users(db: Session = Depends(db.get_session_dependency)):
                return db.query(User).all()
        """
        with self.get_session() as session:
            yield session

    def create_tables(self, base):
        """Create all tables for the given Base"""
        base.metadata.create_all(bind=self.engine)

    def drop_tables(self, base):
        """Drop all tables for the given Base"""
        base.metadata.drop_all(bind=self.engine)

# Create a singleton instance
@lru_cache()
def get_db_manager() -> DatabaseManager:
    return DatabaseManager()
    