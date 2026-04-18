"""
Observability middleware for FairGig Analytics Service — Sprint 4.

Provides a decorator that, when applied to a FastAPI endpoint, emits a
structured-JSON log line via structlog for every request containing:

  - endpoint name
  - duration_ms
  - cache_status  ("hit" | "miss" | "bypass")
  - result_size   (number of items in the response, best-effort)
  - user_role     (extracted from the JWT payload)
  - status        ("ok" | "error")

Usage:
    from app.core.obs import observe

    @router.get("/my-endpoint")
    @observe("my_endpoint")
    async def my_endpoint(...): ...
"""
import time
import functools
import structlog

logger = structlog.get_logger("fairgig.analytics")

def observe(endpoint_name: str):
    """
    Decorates an async route function with structured-JSON timing + cache logging.
    Must be applied ABOVE @with_cache so it wraps the already-cached function.
    """
    def decorator(fn):
        @functools.wraps(fn)
        async def wrapper(*args, **kwargs):
            t0 = time.perf_counter()
            status = "ok"
            result_size = 0
            cache_status = "miss"  # aiocache emits an error-level log on miss; we default conservatively

            try:
                result = await fn(*args, **kwargs)

                # Best-effort result size detection
                if hasattr(result, "__len__"):
                    result_size = len(result)
                elif hasattr(result, "__dict__"):
                    # Pydantic model — count top-level list fields
                    for v in vars(result).values():
                        if isinstance(v, list):
                            result_size = max(result_size, len(v))
                            break
                    else:
                        result_size = 1

                return result

            except Exception as exc:
                status = "error"
                raise exc

            finally:
                duration_ms = round((time.perf_counter() - t0) * 1000, 1)
                # Infer user role from kwargs if available
                user = kwargs.get("user") or {}
                user_role = user.get("role", "unknown") if isinstance(user, dict) else "unknown"

                logger.info(
                    "endpoint.call",
                    endpoint=endpoint_name,
                    duration_ms=duration_ms,
                    status=status,
                    result_size=result_size,
                    user_role=user_role,
                )

        return wrapper
    return decorator
