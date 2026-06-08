from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
import shutil
import uuid
from pathlib import Path

from app.services.xray_service import predict_xray
from app.services.gradcam_service import (
    generate_heatmap_analysis
)
router = APIRouter(
    prefix="/api",
    tags=["XRay"]
)

XRAY_FOLDER = Path("uploads/xrays")
XRAY_FOLDER.mkdir(
    parents=True,
    exist_ok=True
)


@router.post("/analyze-xray")
async def analyze_xray(
    file: UploadFile = File(...)
):

    extension = Path(file.filename).suffix

    filename = f"{uuid.uuid4()}{extension}"

    image_path = XRAY_FOLDER / filename

    with open(image_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    result = predict_xray(
        str(image_path)
    )

    heatmap_data = (
        generate_heatmap_analysis(
            str(image_path)
        )
    )

    return {
        **result,
        **heatmap_data
    }