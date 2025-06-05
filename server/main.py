from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from shared.config import settings
from shared.database.session import get_db_manager
from shared.database.base import Base

app = FastAPI()
app.add_middleware(
    CORSMiddleware, 
    allow_origins=["http://localhost:3000"],  # Your React app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(SessionMiddleware, secret_key=settings.SECRET_KEY)

# Initialize database tables
db_manager = get_db_manager()
db_manager.create_tables(Base)

@app.get("/health")
def read_root():
    return {"message": "Running!"}

from services.auth.routes import oauth_router
app.include_router(oauth_router, prefix="/oauth", tags=["oauth"])