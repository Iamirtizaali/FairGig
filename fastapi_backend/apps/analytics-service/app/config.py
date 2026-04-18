from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    JWT_SECRET: str = "supersecret_fallback"
    JUDGE_API_KEY: str = "softec_judge_2026"
<<<<<<< HEAD
    # Safely swap out local tests with SQLite but keeping the structural setting
    DATABASE_URL: str = "sqlite+aiosqlite:///sql_app.db"
=======
    # Note: Using asyncpg for Postgres as required by prompt
    DATABASE_URL: str = "postgresql+asyncpg://analytics_reader:password@localhost/fairgig"
>>>>>>> d9884f08b13838751b1573eb76b9d18855a76767

    class Config:
        env_file = ".env"

settings = Settings()
