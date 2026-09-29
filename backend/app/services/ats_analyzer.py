import re


COMMON_SECTIONS = [
    "summary",
    "objective",
    "skills",
    "education",
    "experience",
    "projects",
    "certifications",
    "achievements"
]


def analyze_ats(
    resume_text: str,
    job_text: str,
    job_skills: list[str]
) -> dict:

    # -----------------------------
    # 1. Keyword matching
    # -----------------------------

    matched_keywords = []
    missing_keywords = []

    resume_lower = resume_text.lower()

    for skill in job_skills:

        skill_lower = skill.lower()

        if skill_lower in resume_lower:
            matched_keywords.append(skill)
        else:
            missing_keywords.append(skill)

    # -----------------------------
    # 2. Keyword score
    # -----------------------------

    total_keywords = len(job_skills)

    if total_keywords > 0:

        keyword_score = (
            len(matched_keywords)
            / total_keywords
        ) * 100

    else:

        keyword_score = 0

    # -----------------------------
    # 3. Resume sections
    # -----------------------------

    detected_sections = []

    for section in COMMON_SECTIONS:

        pattern = r"\b" + re.escape(section) + r"\b"

        if re.search(
            pattern,
            resume_lower
        ):
            detected_sections.append(section)

    missing_sections = [
        section
        for section in COMMON_SECTIONS
        if section not in detected_sections
    ]

    # -----------------------------
    # 4. Suggestions
    # -----------------------------

    suggestions = []

    if missing_keywords:

        suggestions.append(
            "Consider adding relevant missing job keywords "
            "only when they accurately reflect your skills "
            "or experience."
        )

    if "skills" not in detected_sections:

        suggestions.append(
            "Add a clearly labeled Skills section."
        )

    if "projects" not in detected_sections:

        suggestions.append(
            "Add relevant technical projects with measurable outcomes."
        )

    if "education" not in detected_sections:

        suggestions.append(
            "Add an Education section."
        )

    if "experience" not in detected_sections:

        suggestions.append(
            "Add relevant experience, internships, apprenticeships "
            "or practical work where applicable."
        )

    if len(resume_text) < 1500:

        suggestions.append(
            "The resume contains relatively little extracted text. "
            "Consider adding more relevant project and achievement details."
        )

    # -----------------------------
    # 5. Overall ATS score
    # -----------------------------

    section_score = (
        len(detected_sections)
        / len(COMMON_SECTIONS)
    ) * 100

    ats_score = (
        keyword_score * 0.7
        + section_score * 0.3
    )

    # -----------------------------
    # 6. Return result
    # -----------------------------

    return {

        "ats_score": round(
            ats_score,
            2
        ),

        "keyword_match_score": round(
            keyword_score,
            2
        ),

        "matched_keywords": sorted(
            matched_keywords
        ),

        "missing_keywords": sorted(
            missing_keywords
        ),

        "detected_sections": sorted(
            detected_sections
        ),

        "missing_sections": sorted(
            missing_sections
        ),

        "suggestions": suggestions

    }