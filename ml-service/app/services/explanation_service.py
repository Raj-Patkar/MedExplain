def generate_explanation(parsed_data):

    if not parsed_data:
        return "No important medical parameters detected."

    explanations = []

    for key, details in parsed_data.items():

        status = details["status"]

        if status == "HIGH":
            explanations.append(
                f"{key.title()} is higher than normal."
            )

        elif status == "LOW":
            explanations.append(
                f"{key.title()} is lower than normal."
            )

        else:
            explanations.append(
                f"{key.title()} is within normal range."
            )

    return " ".join(explanations)