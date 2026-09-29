PROJECT_DATABASE = {

    "python": {
        "project": "End-to-End Python Data Analysis Project",
        "description": "Build a complete data analysis project using Python, Pandas and NumPy.",
        "level": "Beginner"
    },

    "sql": {
        "project": "Business Sales Analytics with SQL",
        "description": "Analyze a large sales database using joins, aggregations, subqueries and window functions.",
        "level": "Beginner"
    },

    "power bi": {
        "project": "Interactive Business Intelligence Dashboard",
        "description": "Build an interactive Power BI dashboard with KPIs, filters and business insights.",
        "level": "Intermediate"
    },

    "machine learning": {
        "project": "Customer Churn Prediction System",
        "description": "Build a machine learning pipeline that predicts customer churn and explains important features.",
        "level": "Intermediate"
    },

    "deep learning": {
        "project": "Image Classification with Transfer Learning",
        "description": "Build an image classification system using CNN or transfer learning.",
        "level": "Intermediate"
    },

    "docker": {
        "project": "Dockerized FastAPI ML Application",
        "description": "Package a machine learning API with FastAPI and Docker.",
        "level": "Intermediate"
    },

    "aws": {
        "project": "Deploy a Machine Learning API on AWS",
        "description": "Deploy a trained ML model and FastAPI service to AWS.",
        "level": "Advanced"
    },

    "azure": {
        "project": "Azure Machine Learning Deployment",
        "description": "Train and deploy a machine learning model using Microsoft Azure services.",
        "level": "Advanced"
    },

    "rag": {
        "project": "AI Research Paper RAG Assistant",
        "description": "Build a Retrieval-Augmented Generation application that answers questions from uploaded documents.",
        "level": "Advanced"
    },

    "llm": {
        "project": "LLM Career Assistant",
        "description": "Build an LLM-powered assistant that analyzes resumes and provides career guidance.",
        "level": "Advanced"
    },

    "fastapi": {
        "project": "Production-Style ML API",
        "description": "Create a REST API for machine learning predictions using FastAPI.",
        "level": "Intermediate"
    },

    "mlflow": {
        "project": "ML Experiment Tracking Platform",
        "description": "Track machine learning experiments, metrics and model versions using MLflow.",
        "level": "Advanced"
    }
}


def recommend_projects(
    missing_skills: list[str]
) -> list[dict]:

    recommendations = []

    for skill in missing_skills:

        skill_lower = skill.lower()

        if skill_lower in PROJECT_DATABASE:

            project = PROJECT_DATABASE[skill_lower].copy()

            project["skill"] = skill

            recommendations.append(project)

    return recommendations