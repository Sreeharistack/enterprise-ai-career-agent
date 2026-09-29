from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.api.resume import router as resume_router
from backend.app.api.job import router as job_router
from backend.app.api.analysis import router as analysis_router


app = FastAPI(
    title="AI Career Intelligence Agent",
    description="AI-powered Resume and Job Matching Platform",
    version="1.0.0",
)


# --------------------------------
# CORS Configuration
# --------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------
# API Routers
# --------------------------------

app.include_router(resume_router)
app.include_router(job_router)
app.include_router(analysis_router)


# --------------------------------
# Home
# --------------------------------

@app.get("/")
def home():
    return {
        "message": "AI Career Intelligence Agent is running!",
        "status": "success"
    }


# --------------------------------
# Health Check
# --------------------------------

@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }