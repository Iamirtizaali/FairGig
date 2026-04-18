import hashlib
import functools
import os
import pickle
from contextvars import ContextVar

from aiocache import Cache

# Prefer Redis when REDIS_HOST is set, else in-process memory cache.
# PickleSerializer handles Pydantic models and arbitrary Python objects correctly.
CACHE_TYPE = Cache.REDIS if os.getenv("REDIS_HOST") else Cache.MEMORY
CACHE_HOST = os.getenv("REDIS_HOST", "127.0.0.1")
CACHE_PORT = int(os.getenv("REDIS_PORT", "6379"))

_cache_status: ContextVar[str] = ContextVar("fairgig_cache_status", default="bypass")


def get_cache_status() -> str:
    return _cache_status.get()


def _normalize(value):
    if isinstance(value, dict):
        return {
            str(key): _normalize(val)
            for key, val in sorted(value.items())
            if key not in {"db", "request"}
        }
    if isinstance(value, (list, tuple, set)):
        return [_normalize(item) for item in value]
    if hasattr(value, "model_dump"):
        return _normalize(value.model_dump())
    if hasattr(value, "dict"):
        return _normalize(value.dict())
    return value


def _build_cache_key(func, args, kwargs):
    cleaned_kwargs = {key: value for key, value in kwargs.items() if key not in {"db", "request"}}
    normalized = _normalize({"args": args, "kwargs": cleaned_kwargs})
    digest = hashlib.sha256(pickle.dumps(normalized, protocol=pickle.HIGHEST_PROTOCOL)).hexdigest()
    return f"fairgig:{func.__module__}.{func.__name__}:{digest}"

def with_cache(ttl=60):
    """
    Cache wrapper enforcing a configurable TTL.
    - Worker endpoints: 60 s (default)
    - Advocate endpoints: 300 s (5 min) — KPIs change slowly
    Cache key is built automatically from the function name + arguments.
    Falls back to in-process SimpleMemoryCache when Redis is unavailable.
    """
    def decorator(func):
        @functools.wraps(func)
        async def wrapper(*args, **kwargs):
            if CACHE_TYPE == Cache.REDIS:
                cache = Cache(Cache.REDIS, endpoint=CACHE_HOST, port=CACHE_PORT)
            else:
                cache = Cache(Cache.MEMORY)

            key = _build_cache_key(func, args, kwargs)
            cached_value = await cache.get(key)
            if cached_value is not None:
                _cache_status.set("hit")
                return pickle.loads(cached_value)

            _cache_status.set("miss")
            result = await func(*args, **kwargs)
            await cache.set(key, pickle.dumps(result, protocol=pickle.HIGHEST_PROTOCOL), ttl=ttl)
            return result

        return wrapper

    return decorator

