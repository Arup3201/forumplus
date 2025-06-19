from fastapi import FastAPI
from starlette.middleware.sessions import SessionMiddleware
from shared.config import settings
from shared.middleware import auth_middleware

app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key=settings.SECRET_KEY)

# Add auth middleware
app.middleware("http")(auth_middleware)

@app.get("/health")
def read_root():
    return {"message": "Running!"}

from services.auth.routes import oauth_router, user_router
from services.core.routes import thread_router

app.include_router(oauth_router, prefix="/api/auth", tags=["Authentication System"])
app.include_router(user_router, prefix="/api/auth", tags=["User System"])
app.include_router(thread_router, prefix="/api/threads", tags=["Thread System"])