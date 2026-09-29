import re


SKILLS = [
    "python",
    "sql",
    "mysql",
    "postgresql",
    "pandas",
    "numpy",
    "scikit-learn",
    "machine learning",
    "deep learning",
    "tensorflow",
    "pytorch",
    "nlp",
    "llm",
    "rag",
    "fastapi",
    "flask",
    "django",
    "docker",
    "kubernetes",
    "aws",
    "azure",
    "gcp",
    "spark",
    "pyspark",
    "mlflow",
    "git",
    "github",
    "power bi",
    "tableau"
]


# Related skills
RELATED_SKILLS = {
    "machine learning": [
        "scikit-learn",
        "tensorflow",
        "pytorch"
    ],

    "deep learning": [
        "tensorflow",
        "pytorch"
    ],

    "sql": [
        "mysql",
        "postgresql"
    ],

    "git": [
        "github"
    ]
}


def extract_skills(text: str) -> list[str]:

    text = text.lower()

    found_skills = []

    for skill in SKILLS:

        pattern = r"\b" + re.escape(skill) + r"\b"

        if re.search(pattern, text):

            found_skills.append(skill)

    return sorted(found_skills)


def find_partial_skills(
    resume_skills: list[str],
    job_skills: list[str]
) -> list[str]:

    resume_set = set(resume_skills)

    job_set = set(job_skills)

    partial_skills = []

    for job_skill in job_set:

        # If already present, it is NOT partial
        if job_skill in resume_set:
            continue

        related_skills = RELATED_SKILLS.get(
            job_skill,
            []
        )

        for related_skill in related_skills:

            if related_skill in resume_set:

                partial_skills.append(
                    job_skill
                )

                break

    return sorted(set(partial_skills))