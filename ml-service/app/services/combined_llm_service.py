import json
import re
import ollama


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

Analyze BOTH:

1. Structured medical report findings
2. Chest X-ray findings

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
- Consider both report and X-ray together
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
If findings do not appear related, mention that as well.
"""

    try:

        response = ollama.chat(
            model="phi3",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        content = response["message"]["content"]

       
        cleaned = clean_json_response(
            content
        )

        return json.loads(cleaned)

    except Exception as e:

        return {
            "overall_severity": "unknown",
            "summary": str(e),
            "combined_findings": [],
            "recommendations": []
        }