def generate_learning_roadmap(
    missing_skills: list[str],
    partial_skills: list[str]
) -> dict:

    roadmap = {
        "days_30": [],
        "days_60": [],
        "days_90": []
    }

    # First priority:
    # strengthen partial skills
    for skill in partial_skills:
        roadmap["days_30"].append(
            f"Strengthen {skill}"
        )

    # Second priority:
    # start learning missing skills
    for index, skill in enumerate(missing_skills):

        if index < 2:
            roadmap["days_30"].append(
                f"Start learning {skill}"
            )

        elif index < 4:
            roadmap["days_60"].append(
                f"Build practical projects using {skill}"
            )

        else:
            roadmap["days_90"].append(
                f"Develop advanced skills in {skill}"
            )

    return roadmap