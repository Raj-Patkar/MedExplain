from app.services.explanation_templates import (
    EXPLANATION_TEMPLATES
)


def generate_explanation(parsed_data):

    if not parsed_data:
        return (
            "No important medical parameters "
            "were detected in the report."
        )

    explanations = []

    for parameter, details in parsed_data.items():

        status = details["status"]

        parameter_templates = (
            EXPLANATION_TEMPLATES.get(parameter)
        )

        if parameter_templates:

            explanation = (
                parameter_templates.get(status)
            )

            explanations.append(explanation)

    final_summary = " ".join(explanations)

    return final_summary