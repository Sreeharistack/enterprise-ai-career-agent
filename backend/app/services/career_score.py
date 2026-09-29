def calculate_career_fit_score(
    matched_count: int,
    partial_count: int,
    missing_count: int
) -> float:

    total_required_skills = (
        matched_count
        + partial_count
        + missing_count
    )

    if total_required_skills == 0:
        return 0.0

    score = (
        matched_count
        + (partial_count * 0.5)
    )

    percentage = (
        score / total_required_skills
    ) * 100

    return round(percentage, 2)