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

from services.auth.routes import oauth_router
from services.content.routes import content_router

app.include_router(oauth_router, prefix="/api/auth", tags=["auth"])
app.include_router(content_router, prefix="/api/content", tags=["content"])