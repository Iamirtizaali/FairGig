from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    JWT_SECRET: str = "supersecret_fallback"
    JUDGE_API_KEY: str = "softec_judge_2026"

    # Node backend API base URLs (no trailing slash)
    EARNINGS_SERVICE_URL: str = "http://localhost:3002"
    GRIEVANCE_SERVICE_URL: str = "http://localhost:3004"

    # Long-lived service token for internal admin-level calls from FastAPI → Node
    # Generate once: node -e "require('jsonwebtoken').sign({sub:'analytics-svc',role:'admin'},'<JWT_SECRET>',{noTimestamp:true})"
    INTERNAL_SERVICE_TOKEN: str = ""

    class Config:
        env_file = ".env"

settings = Settings()
