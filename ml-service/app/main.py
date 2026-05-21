from fastapi import FastAPI
from app.api.report import router as report_router

app = FastAPI(
    title="MedExplain AI",
    version="1.0.0"
)

app.include_router(report_router)

@app.get("/")
def root():
    return {
        "message": "MedExplain AI Backend Running"
    }