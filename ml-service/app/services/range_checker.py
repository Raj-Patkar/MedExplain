def get_status(value, min_val, max_val):

    if value < min_val:
        return "LOW"

    if value > max_val:
        return "HIGH"

    return "NORMAL"