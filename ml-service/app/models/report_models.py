from pydantic import BaseModel
from typing import Dict, Any

class ReportResponse(BaseModel):
    filename: str
    extracted_values: Dict[str, Any]
    summary: str    