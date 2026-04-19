FROM python:3.11-slim

WORKDIR /app

# Install dependencies
# We copy the entire apps/analytics-service context
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

# Expose port (Hugging Face Spaces uses 7860 by default)
EXPOSE 7860

# Run Uvicorn
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-7860}"]
