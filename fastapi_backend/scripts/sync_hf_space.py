from __future__ import annotations

import argparse
import os
from pathlib import Path

from huggingface_hub import HfApi


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Sync a service folder to a Hugging Face Space")
    parser.add_argument("--repo-id", required=True, help="Target Hugging Face Space repo id")
    parser.add_argument("--service-dir", required=True, help="Local service directory to upload")
    parser.add_argument(
        "--commit-message",
        default="Sync from GitHub",
        help="Commit message used for the Hugging Face upload",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    service_dir = Path(args.service_dir)
    if not service_dir.exists():
        raise SystemExit(f"Service directory not found: {service_dir}")

    token = os.environ.get("HF_TOKEN")
    if not token:
        raise SystemExit("HF_TOKEN is required")

    api = HfApi(token=token)
    api.upload_folder(
        repo_id=args.repo_id,
        repo_type="space",
        folder_path=str(service_dir),
        commit_message=args.commit_message,
        allow_patterns=[
            "app/**",
            "Dockerfile",
            "requirements.txt",
            "README.md",
        ],
    )


if __name__ == "__main__":
    main()