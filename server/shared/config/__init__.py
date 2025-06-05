from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    SECRET_KEY: str

    GOOGLE_CLIENT_SECRET: str
    GOOGLE_CLIENT_ID: str

    GITHUB_CLIENT_SECRET: str
    GITHUB_CLIENT_ID: str

    model_config = SettingsConfigDict(env_file=".env")
    
settings = Settings()