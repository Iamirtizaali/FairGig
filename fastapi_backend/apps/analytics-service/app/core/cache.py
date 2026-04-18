import os
from aiocache import Cache, cached
from aiocache.serializers import PickleSerializer

# Prefer Redis when REDIS_HOST is set, else in-process memory cache.
# PickleSerializer handles Pydantic models and arbitrary Python objects correctly.
CACHE_TYPE = Cache.REDIS if os.getenv("REDIS_HOST") else Cache.MEMORY
CACHE_HOST = os.getenv("REDIS_HOST", "127.0.0.1")
CACHE_PORT = int(os.getenv("REDIS_PORT", "6379"))

def with_cache(ttl=60):
    """
    Cache wrapper enforcing a configurable TTL.
    - Worker endpoints: 60 s (default)
    - Advocate endpoints: 300 s (5 min) — KPIs change slowly
    Cache key is built automatically from the function name + arguments.
    Falls back to in-process SimpleMemoryCache when Redis is unavailable.
    """
    if CACHE_TYPE == Cache.REDIS:
        return cached(
            ttl=ttl,
            cache=Cache.REDIS,
            endpoint=CACHE_HOST,
            port=CACHE_PORT,
            serializer=PickleSerializer(),
        )
    return cached(
        ttl=ttl,
        cache=Cache.MEMORY,
        serializer=PickleSerializer(),
    )

