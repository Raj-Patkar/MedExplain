import json
import re
import os

from google import genai
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

MODEL_NAME = "gemini-2.5-flash"


def clean_json_response(content):

    content = content.strip()

    content = re.sub(r"^```json", "", content)
    content = re.sub(r"^```", "", content)
    content = re.sub(r"```$", "", content)

    return content.strip()


def generate_combined_insights(
    report_data,
    xray_data
):

    prompt = f"""
You are a medical AI assistant.

Analyze the provided medical information.

The input may contain:

1. Medical report findings only
2. Chest X-ray findings only
3. Both report and X-ray findings

Use whatever information is available.

Return ONLY valid JSON.

{{
  "overall_severity": "None | Mild | Moderate | Severe",
  "summary": "Patient-friendly explanation",
  "combined_findings": [
    "Finding 1",
    "Finding 2"
  ],
  "recommendations": [
    "Recommendation 1",
    "Recommendation 2"
  ]
}}

Medical Report:

{json.dumps(report_data, indent=2)}

X-Ray Findings:

{json.dumps(xray_data, indent=2)}

Rules:

- Return ONLY valid JSON
- Do not wrap response in markdown
- Do not use ```json
- Do not diagnose diseases
- Explain findings in patient-friendly language
- Mention uncertainty when appropriate

If both report and X-ray findings are available,
consider them together.

If only one source is available,
base your explanation only on that source.

- overall_severity must be exactly one of:
  None, Mild, Moderate, Severe

- combined_findings must be an array of strings

- recommendations must be an array of strings

- summary must be a string

Pay special attention to relationships between:

- Blood markers
- Infection indicators
- X-ray findings

If findings appear related, mention the possible connection.

If findings do not appear related,
mention that as well.
"""

    try:

        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt
        )

        cleaned = clean_json_response(response.text)

        return json.loads(cleaned)

    except Exception as error:

        return {
            "overall_severity": "unknown",
            "summary": str(error),
            "combined_findings": [],
            "recommendations": []
        }