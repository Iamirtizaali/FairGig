from fastapi import APIRouter, Depends

from app.api.deps import require_roles
from app.core.jobs import run_vulnerability_job

router = APIRouter()


@router.post(
    "/refresh-vulnerability",
    summary="Force-refresh the vulnerability materialised view (root alias)",
)
async def refresh_vulnerability(user: dict = Depends(require_roles("admin", "judge"))):
    return await run_vulnerability_job()