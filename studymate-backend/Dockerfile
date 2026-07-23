# Halka Python image use kar rahe hain
FROM python:3.11-slim

# Container ke andar working folder
WORKDIR /app

# Pehle requirements copy karke install karo (Docker caching ke liye better)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Baaki poora backend code copy karo
COPY . .

# FastAPI is port pe chalega
EXPOSE 8000

# Container start hote hi ye command chalegi (Bug 1 Fixed: app.main:app use kiya gaya hai)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]