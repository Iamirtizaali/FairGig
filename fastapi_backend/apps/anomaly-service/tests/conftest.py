import sys
from pathlib import Path

SERVICE_ROOT = Path(__file__).resolve().parents[1]
if str(SERVICE_ROOT) not in sys.path:
    sys.path.insert(0, str(SERVICE_ROOT))

# Prevent cross-service collisions when both suites are collected in one pytest run.
for key in list(sys.modules):
    if key == "app" or key.startswith("app."):
        del sys.modules[key]
