from fastapi import APIRouter, UploadFile, File

from app.services.pdf_extractor import (
    extract_pdf_text
)

from app.services.medical_parser import (
    parse_medical_report
)

from app.services.llm_service import (
    generate_medical_insights
)

from app.models.report_models import (
    ReportResponse
)

import shutil
import os


router = APIRouter(
    prefix="/report",
    tags=["Report Analysis"]
)


UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post(
    "/analyze",
    response_model=ReportResponse
)
async def analyze_report(
    file: UploadFile = File(...)
):

    file_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    extracted_text = extract_pdf_text(
        file_path
    )

    parsed_data = parse_medical_report(
        extracted_text
    )

    llm_response = generate_medical_insights(
        parsed_data
    )

    return {
        "filename": file.filename,

        "extracted_values": parsed_data,

        "overall_severity":
            llm_response.get(
                "overall_severity",
                "unknown"
            ),

        "abnormal_findings":
            llm_response.get(
                "abnormal_findings",
                []
            ),

        "recommendations":
            llm_response.get(
                "recommendations",
                []
            ),

        "summary":
            llm_response.get(
                "summary",
                ""
            )
    }