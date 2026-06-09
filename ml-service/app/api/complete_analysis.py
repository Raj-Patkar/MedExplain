from fastapi import (
    APIRouter,
    UploadFile,
    File
)

import os
import shutil
import uuid

from app.services.pdf_extractor import (
    extract_pdf_text
)

from app.services.medical_parser import (
    parse_medical_report
)

from app.services.xray_service import (
    predict_xray
)

from app.services.gradcam_service import (
    generate_heatmap_analysis
)

from app.services.combined_llm_service import (
    generate_combined_insights
)

router = APIRouter(
    prefix="/analysis",
    tags=["Complete Analysis"]
)

UPLOAD_DIR = "uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)

@router.post("/complete")
async def analyze_complete(
    report_file: UploadFile = File(...),
    xray_file: UploadFile = File(...)
):

    report_path = os.path.join(
        UPLOAD_DIR,
        f"{uuid.uuid4()}_{report_file.filename}"
    )

    with open(report_path, "wb") as buffer:
        shutil.copyfileobj(
            report_file.file,
            buffer
        )

    xray_path = os.path.join(
        UPLOAD_DIR,
        f"{uuid.uuid4()}_{xray_file.filename}"
    )

    with open(xray_path, "wb") as buffer:
        shutil.copyfileobj(
            xray_file.file,
            buffer
        )

    extracted_text = extract_pdf_text(
        report_path
    )

    parsed_data = parse_medical_report(
        extracted_text
    )

    xray_prediction = predict_xray(
        xray_path
    )

    heatmap_data = (
        generate_heatmap_analysis(
            xray_path
        )
    )

    xray_analysis = {
        **xray_prediction,
        **heatmap_data
    }

    combined_analysis = (
        generate_combined_insights(
            parsed_data,
            xray_analysis
        )
    )

    return {
        "report_analysis": {
            "extracted_values":
                parsed_data
        },

        "xray_analysis":
            xray_analysis,

        "combined_analysis":
            combined_analysis
    }