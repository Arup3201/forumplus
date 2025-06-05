from shared.database.session import get_db_manager
from shared.database.base import Base
from services.auth.models import User, OAuthProvider

def init_db():
    db_manager = get_db_manager()
    db_manager.create_tables(Base)

if __name__ == "__main__":
    init_db()
