from backend.app.services.llm_service import ask_ai


def generate_ai_career_analysis(
    resume_text: str,
    job_text: str,
    matched_skills: list[str],
    partial_skills: list[str],
    missing_skills: list[str],
    career_fit_score: float
) -> str:
    """
    Generate an AI-powered career analysis
    using the resume and job description.
    """

    prompt = f"""
You are an expert AI Career Intelligence Assistant.

Analyze the candidate's resume against the job description.

IMPORTANT:
- Use only information provided in the resume and job description.
- Do not invent experience, education, certifications, projects, or skills.
- Clearly distinguish existing skills from missing skills.
- Give practical and realistic recommendations.
- The candidate is applying for a technology/data/AI role.

CAREER FIT SCORE:
{career_fit_score}%

MATCHED SKILLS:
{", ".join(matched_skills) if matched_skills else "None"}

PARTIAL SKILLS:
{", ".join(partial_skills) if partial_skills else "None"}

MISSING SKILLS:
{", ".join(missing_skills) if missing_skills else "None"}

RESUME:
{resume_text[:12000]}

JOB DESCRIPTION:
{job_text[:12000]}

Create a professional career analysis with these sections:

1. Candidate Summary
2. Job Requirements Summary
3. Strong Skill Matches
4. Skill Gaps
5. Why the Skill Gaps Matter
6. Recommended Learning Plan
7. Recommended Portfolio Projects
8. ATS Resume Improvements
9. Interview Preparation
10. Final Action Plan

Keep the response practical and suitable for a fresher.
"""


    return ask_ai(prompt)