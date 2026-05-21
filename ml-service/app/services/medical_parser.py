import re

from app.services.medical_dictionary import (
    MEDICAL_PARAMETERS
)

from app.services.range_checker import (
    get_status
)


def parse_medical_report(text: str):

    report = {}

    lower_text = text.lower()

    for parameter, details in MEDICAL_PARAMETERS.items():

        aliases = details["aliases"]

        for alias in aliases:

            pattern = rf"{alias}\s*[:\-]?\s*(\d+\.?\d*)"

            match = re.search(pattern, lower_text)

            if match:

                value = float(match.group(1))

                status = get_status(
                    value,
                    details["min"],
                    details["max"]
                )

                report[parameter] = {
                    "value": value,
                    "unit": details["unit"],
                    "status": status,
                    "normal_range": (
                        f"{details['min']} - "
                        f"{details['max']}"
                    )
                }

                break

    return report