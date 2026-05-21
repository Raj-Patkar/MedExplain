import re

NORMAL_RANGES = {
    "hemoglobin": (13, 17),
    "blood sugar": (70, 140),
    "cholesterol": (125, 200)
}

def get_status(value, min_val, max_val):

    if value < min_val:
        return "LOW"

    elif value > max_val:
        return "HIGH"

    return "NORMAL"


def parse_medical_report(text: str):

    report = {}

    patterns = {
        "hemoglobin": r"hemoglobin\s*[:\-]?\s*(\d+\.?\d*)",
        "blood sugar": r"blood sugar\s*[:\-]?\s*(\d+\.?\d*)",
        "cholesterol": r"cholesterol\s*[:\-]?\s*(\d+\.?\d*)"
    }

    lower_text = text.lower()

    for key, pattern in patterns.items():

        match = re.search(pattern, lower_text)

        if match:

            value = float(match.group(1))

            min_val, max_val = NORMAL_RANGES[key]

            report[key] = {
                "value": value,
                "status": get_status(value, min_val, max_val)
            }

    return report