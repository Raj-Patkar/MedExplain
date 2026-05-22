import json
import ollama


def generate_medical_insights(parsed_data):

    if not parsed_data:
        return (
            "No important medical findings "
            "were detected in the report."
        )

    prompt = f"""
    You are a medical AI assistant.

    Analyze the following structured
    medical report.

    Explain:
    - abnormal findings
    - possible concerns
    - severity level
    - follow-up recommendations

    Use:
    - patient-friendly language
    - concise explanations
    - medically responsible wording

    DO NOT diagnose diseases.
    Mention uncertainty where appropriate.

    Medical Report:
    {json.dumps(parsed_data, indent=2)}
    """

    response = ollama.chat(
        model="phi3",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response["message"]["content"]