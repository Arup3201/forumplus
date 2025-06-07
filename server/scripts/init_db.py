from shared.database import get_db_manager
from shared.model import Base
from services.auth.models import User, OAuthProvider
from shared.model import Session

def init_db():
    db_manager = get_db_manager()
    db_manager.create_tables(Base)

if __name__ == "__main__":
    init_db()
