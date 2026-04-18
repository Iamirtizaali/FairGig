from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    JWT_SECRET: str = "supersecret_fallback"
    JUDGE_API_KEY: str = "softec_judge_2026"
    DATABASE_URL: str = "sqlite+aiosqlite:///sql_app.db"

    class Config:
        env_file = ".env"

settings = Settings()
