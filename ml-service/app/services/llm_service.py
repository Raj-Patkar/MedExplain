import json
import re
import ollama


def clean_json_response(content):

    content = content.strip()

    content = re.sub(
        r"^```json",
        "",
        content
    )

    content = re.sub(
        r"^```",
        "",
        content
    )

    content = re.sub(
        r"```$",
        "",
        content
    )

    content = content.strip()

    return content


def generate_medical_insights(parsed_data):

    if not parsed_data:

        return {
            "overall_severity": "normal",
            "abnormal_findings": [],
            "recommendations": [],
            "summary": (
                "No important medical findings "
                "were detected."
            )
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

        cleaned_content = clean_json_response(
            content
        )

        return json.loads(cleaned_content)

    except Exception as error:

        return {
            "overall_severity": "unknown",
            "abnormal_findings": [],
            "recommendations": [],
            "summary": (
                f"LLM analysis failed: {str(error)}"
            )
        }