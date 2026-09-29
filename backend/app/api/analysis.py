from fastapi import APIRouter, HTTPException
from pathlib import Path

from backend.app.services.pdf_parser import extract_text_from_pdf

from backend.app.services.skill_extractor import (
    extract_skills,
    find_partial_skills
)

from backend.app.services.career_score import (
    calculate_career_fit_score
)

from backend.app.services.career_report import (
    generate_career_report
)

from backend.app.services.learning_roadmap import (
    generate_learning_roadmap
)

from backend.app.services.project_recommender import (
    recommend_projects
)

from backend.app.services.interview_agent import (
    generate_interview_questions
)

from backend.app.services.ai_career_analyzer import (
    generate_ai_career_analysis
)

from backend.app.services.ats_analyzer import (
    analyze_ats
)


router = APIRouter(
    prefix="/analysis",
    tags=["Career Analysis"]
)


UPLOAD_FOLDER = Path("backend/uploads")


@router.post("/analyze")
def analyze_uploaded_documents():

    resume_file = (
        UPLOAD_FOLDER /
        "current_resume.pdf"
    )

    job_file = (
        UPLOAD_FOLDER /
        "current_job_description.pdf"
    )

    # --------------------------------
    # Check uploaded files
    # --------------------------------

    if not resume_file.exists():

        raise HTTPException(
            status_code=400,
            detail="Please upload a resume first."
        )

    if not job_file.exists():

        raise HTTPException(
            status_code=400,
            detail="Please upload a job description first."
        )


    # --------------------------------
    # 1. Extract PDF text
    # --------------------------------

    resume_text = extract_text_from_pdf(
        str(resume_file)
    )

    job_text = extract_text_from_pdf(
        str(job_file)
    )


    # --------------------------------
    # 2. Extract skills
    # --------------------------------

    resume_skills = extract_skills(
        resume_text
    )

    job_skills = extract_skills(
        job_text
    )


    resume_set = set(resume_skills)

    job_set = set(job_skills)


    # --------------------------------
    # 3. Matched skills
    # --------------------------------

    matched_skills = sorted(
        resume_set.intersection(
            job_set
        )
    )


    # --------------------------------
    # 4. Partial skills
    # --------------------------------

    partial_skills = find_partial_skills(
        resume_skills,
        job_skills
    )

    partial_set = set(
        partial_skills
    )


    # --------------------------------
    # 5. Missing skills
    # --------------------------------

    missing_skills = sorted(
        job_set
        - resume_set
        - partial_set
    )


    # --------------------------------
    # 6. Skill match percentage
    # --------------------------------

    if len(job_set) > 0:

        match_percentage = (
            len(matched_skills)
            / len(job_set)
        ) * 100

    else:

        match_percentage = 0


    # --------------------------------
    # 7. Career fit score
    # --------------------------------

    career_fit_score = (
        calculate_career_fit_score(
            matched_count=len(
                matched_skills
            ),
            partial_count=len(
                partial_skills
            ),
            missing_count=len(
                missing_skills
            )
        )
    )


    # --------------------------------
    # 8. Career report
    # --------------------------------

    career_report = (
        generate_career_report(
            matched_skills=matched_skills,
            partial_skills=partial_skills,
            missing_skills=missing_skills,
            career_fit_score=career_fit_score
        )
    )


    # --------------------------------
    # 9. Learning roadmap
    # --------------------------------

    learning_roadmap = (
        generate_learning_roadmap(
            missing_skills=missing_skills,
            partial_skills=partial_skills
        )
    )


    # --------------------------------
    # 10. Project recommendations
    # --------------------------------

    project_recommendations = (
        recommend_projects(
            missing_skills=missing_skills
        )
    )


    # --------------------------------
    # 11. Interview questions
    # --------------------------------

    interview_questions = (
        generate_interview_questions(
            job_skills=job_skills,
            missing_skills=missing_skills
        )
    )


    # --------------------------------
    # 12. AI career analysis
    # --------------------------------

    ai_career_analysis = (
        generate_ai_career_analysis(
            resume_text=resume_text,
            job_text=job_text,
            matched_skills=matched_skills,
            partial_skills=partial_skills,
            missing_skills=missing_skills,
            career_fit_score=career_fit_score
        )
    )


    # --------------------------------
    # 13. ATS analysis
    # --------------------------------

    ats_analysis = analyze_ats(
        resume_text=resume_text,
        job_text=job_text,
        job_skills=job_skills
    )


    # --------------------------------
    # 14. Final response
    # --------------------------------

    return {

        "resume_file": resume_file.name,

        "job_description_file":
            job_file.name,

        "resume_skills":
            resume_skills,

        "job_skills":
            job_skills,

        "matched_skills":
            matched_skills,

        "partial_skills":
            partial_skills,

        "missing_skills":
            missing_skills,

        "match_count":
            len(matched_skills),

        "partial_count":
            len(partial_skills),

        "missing_count":
            len(missing_skills),

        "skill_match_percentage":
            round(
                match_percentage,
                2
            ),

        "career_fit_score":
            career_fit_score,

        "career_report":
            career_report,

        "learning_roadmap":
            learning_roadmap,

        "project_recommendations":
            project_recommendations,

        "interview_questions":
            interview_questions,

        "ai_career_analysis":
            ai_career_analysis,

        "ats_analysis":
            ats_analysis
    }