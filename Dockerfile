FROM python:3.13-slim

WORKDIR /app
COPY . .
COPY requirements.txt .
RUN pip install -r requirements.txt

EXPOSE 8002
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
