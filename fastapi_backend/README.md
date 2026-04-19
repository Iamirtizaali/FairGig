# FastAPI Backend

This is the backend for FairGig built with FastAPI.

## GitHub to Hugging Face Sync

This repository includes GitHub Actions workflows that sync the two FastAPI services to Hugging Face Spaces on every push to `main`:

- [`.github/workflows/sync-anomaly-to-hf.yml`](.github/workflows/sync-anomaly-to-hf.yml)
- [`.github/workflows/sync-analytics-to-hf.yml`](.github/workflows/sync-analytics-to-hf.yml)

Required GitHub secret:

- `HF_TOKEN` - a Hugging Face User Access Token with write access to the target Spaces

The workflows upload only the runtime files from each service folder:

- `app/**`
- `Dockerfile`
- `requirements.txt`
- `README.md`

If you rename the Hugging Face Spaces, update the `--repo-id` values inside [scripts/sync_hf_space.py](scripts/sync_hf_space.py).

## Setup

1. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
2. Activate the virtual environment:
   - Command Prompt: `venv\Scripts\activate.bat`
   - PowerShell: `venv\Scripts\Activate.ps1`
   - Linux/Mac: `source venv/bin/activate`
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Server

Start the development server with hot-reload:
```bash
uvicorn main:app --reload
```

The API will be available at `http://127.0.0.1:8000`.
You can access the interactive API docs at `http://127.0.0.1:8000/docs`.
