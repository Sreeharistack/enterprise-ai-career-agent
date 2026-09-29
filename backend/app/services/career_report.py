def generate_career_report(
    matched_skills: list[str],
    partial_skills: list[str],
    missing_skills: list[str],
    career_fit_score: float
) -> dict:

    # Strengths are the skills already matched
    strengths = matched_skills

    # Skills that need improvement
    improvement_skills = partial_skills

    # Skills completely missing from the resume
    skill_gaps = missing_skills

    # Create learning priorities
    learning_priorities = []

    for skill in missing_skills:
        learning_priorities.append(
            f"Learn {skill}"
        )

    for skill in partial_skills:
        learning_priorities.append(
            f"Strengthen {skill}"
        )

    # Create a simple summary
    if career_fit_score >= 80:

        summary = (
            "The resume shows strong alignment "
            "with the job requirements."
        )

    elif career_fit_score >= 60:

        summary = (
            "The resume shows moderate alignment "
            "with the job requirements, with some "
            "skills that should be strengthened."
        )

    else:

        summary = (
            "The resume has several skill gaps "
            "compared with the job requirements."
        )

    return {
        "career_fit_score": career_fit_score,

        "summary": summary,

        "strengths": strengths,

        "skills_to_improve": improvement_skills,

        "skill_gaps": skill_gaps,

        "learning_priorities": learning_priorities
    }