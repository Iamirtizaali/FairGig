# FastAPI Backend

This is the backend for FairGig built with FastAPI.

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
