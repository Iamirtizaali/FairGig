import os
from aiocache import Cache, cached
from aiocache.serializers import JsonSerializer

# We wrap aiocache. If REDIS connection variables exist we use them, otherwise we fallback to SimpleMemoryCache
# so testing succeeds flawlessly on local machines without crashing.

CACHE_TYPE = Cache.REDIS if os.getenv("REDIS_HOST") else Cache.MEMORY
CACHE_HOST = os.getenv("REDIS_HOST", "127.0.0.1")
CACHE_PORT = int(os.getenv("REDIS_PORT", "6379"))

def with_cache(ttl=60):
    """
    Cache wrapper enforcing the 60s TTL requested in Sprint 2.
    It automatically builds a key from the function name and arguments (including user dict from JWT).
    """
    if CACHE_TYPE == Cache.REDIS:
        return cached(
            ttl=ttl, 
            cache=Cache.REDIS, 
            endpoint=CACHE_HOST, 
            port=CACHE_PORT, 
            serializer=JsonSerializer()
        )
    return cached(
        ttl=ttl, 
        cache=Cache.MEMORY, 
        serializer=JsonSerializer()
    )
