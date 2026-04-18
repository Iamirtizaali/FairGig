from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    JWT_SECRET: str = "supersecret_fallback"
    JUDGE_API_KEY: str = "softec_judge_2026"
    # Note: Using asyncpg for Postgres as required by prompt
    DATABASE_URL: str = "postgresql+asyncpg://analytics_reader:password@localhost/fairgig"

    class Config:
        env_file = ".env"

settings = Settings()
