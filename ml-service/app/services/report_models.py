from pydantic import BaseModel
from typing import Dict, Any, List


class Finding(BaseModel):
    parameter: str
    status: str
    concern: str


class ReportResponse(BaseModel):

    filename: str

    extracted_values: Dict[str, Any]

    overall_severity: str

    abnormal_findings: List[Finding]

    recommendations: List[str]

    summary: str