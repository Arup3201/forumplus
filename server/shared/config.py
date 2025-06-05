from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # General
    SECRET_KEY: str

    # Google
    GOOGLE_CLIENT_SECRET: str
    GOOGLE_CLIENT_ID: str

    # GitHub
    GITHUB_CLIENT_SECRET: str
    GITHUB_CLIENT_ID: str

    # PostgreSQL
    PG_USER: str
    PG_PASSWORD: str
    PG_HOST: str
    PG_PORT: int
    PG_DATABASE: str
    
    # SQLAlchemy
    SQL_ECHO: bool = True
    
    model_config = SettingsConfigDict(env_file=".env")
    
settings = Settings()