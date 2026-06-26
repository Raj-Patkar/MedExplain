from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.report import router as report_router
from app.api.xray import router as xray_router
from app.api.complete_analysis import router as complete_router

app = FastAPI(
    title="MedExplain AI",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        # Add your Vercel URL here after deployment
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure heatmap directory exists
heatmap_dir = Path("uploads/heatmaps")
heatmap_dir.mkdir(parents=True, exist_ok=True)

app.mount(
    "/heatmaps",
    StaticFiles(directory=heatmap_dir),
    name="heatmaps",
)

# Register routers
app.include_router(report_router)
app.include_router(xray_router)
app.include_router(complete_router)

@app.get("/")
def root():
    return {
        "status": "online",
        "service": "MedExplain AI",
        "version": "1.0.0",
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }