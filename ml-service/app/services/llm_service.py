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


def generate_medical_insights(parsed_data):

    if not parsed_data:
        return {
            "overall_severity": "normal",
            "abnormal_findings": [],
            "recommendations": [],
            "summary": "No important medical findings were detected."
        }

    prompt = f"""
You are a medical AI assistant.

Analyze the following medical report.

Return ONLY valid JSON.

JSON format:

{{
  "overall_severity": "",
  "abnormal_findings": [
    {{
      "parameter": "",
      "status": "",
      "concern": ""
    }}
  ],
  "recommendations": [],
  "summary": ""
}}

Rules:
- Return ONLY JSON
- No markdown
- No explanations outside JSON
- Use concise medical reasoning
- Do NOT diagnose diseases
- Mention uncertainty when appropriate

Medical Report:

{json.dumps(parsed_data, indent=2)}
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
            "abnormal_findings": [],
            "recommendations": [],
            "summary": f"LLM analysis failed: {str(error)}"
        }