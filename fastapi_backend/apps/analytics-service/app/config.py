from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    JWT_SECRET: str = "supersecret_fallback"
    JUDGE_API_KEY: str = "softec_judge_2026"
    DATABASE_URL: str = "sqlite+aiosqlite:///sql_app.db"
    SUPABASE_URL: str = ""
    SUPABASE_SERVICE_ROLE_KEY: str = ""
    SYNC_FROM_SUPABASE: bool = True

    class Config:
        env_file = ".env"

settings = Settings()
