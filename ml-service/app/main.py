from fastapi import FastAPI

from app.api.report import router as report_router
from app.api.xray import router as xray_router

app = FastAPI(
    title="MedExplain AI",
    version="1.0.0"
)

app.include_router(report_router)
app.include_router(xray_router)

@app.get("/")
def root():
    return {
        "message": "MedExplain AI Backend Running"
    }