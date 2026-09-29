INTERVIEW_QUESTIONS = {

    "python": [
        "What are the main features of Python?",
        "What is the difference between a list, tuple and set in Python?",
        "How do you handle exceptions in Python?"
    ],

    "sql": [
        "What is the difference between INNER JOIN and LEFT JOIN?",
        "What is GROUP BY used for in SQL?",
        "What is the difference between WHERE and HAVING?"
    ],

    "machine learning": [
        "What is supervised learning?",
        "What is the difference between classification and regression?",
        "What is overfitting and how can you prevent it?"
    ],

    "deep learning": [
        "What is a neural network?",
        "What is the difference between CNN and RNN?",
        "What is backpropagation?"
    ],

    "power bi": [
        "What is Power BI?",
        "What is the difference between Power Query and DAX?",
        "How would you design a sales dashboard in Power BI?"
    ],

    "docker": [
        "What is Docker?",
        "What is a Docker image?",
        "Why would you use Docker for a machine learning application?"
    ],

    "aws": [
        "What is AWS?",
        "Which AWS services can be used to deploy machine learning applications?",
        "How would you deploy a FastAPI application on AWS?"
    ],

    "fastapi": [
        "What is FastAPI?",
        "Why would you use FastAPI for a machine learning API?",
        "What is the difference between GET and POST requests?"
    ],

    "llm": [
        "What is a Large Language Model?",
        "What is prompt engineering?",
        "What are hallucinations in LLM applications?"
    ],

    "rag": [
        "What is Retrieval-Augmented Generation?",
        "Why is RAG useful for enterprise applications?",
        "What are embeddings and vector databases?"
    ],

    "mlflow": [
        "What is MLflow?",
        "Why is experiment tracking important?",
        "How can MLflow help manage machine learning models?"
    ]
}


def generate_interview_questions(
    job_skills: list[str],
    missing_skills: list[str]
) -> dict:

    technical_questions = []

    for skill in job_skills:

        skill_lower = skill.lower()

        questions = INTERVIEW_QUESTIONS.get(
            skill_lower,
            []
        )

        for question in questions:

            technical_questions.append({
                "skill": skill,
                "question": question
            })

    skill_gap_questions = []

    for skill in missing_skills:

        skill_gap_questions.append({
            "skill": skill,
            "question": (
                f"You have not listed {skill} "
                "on your resume. How would you "
                f"learn and apply {skill} in a project?"
            )
        })

    return {
        "technical_questions": technical_questions,
        "skill_gap_questions": skill_gap_questions
    }