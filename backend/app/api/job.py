from fastapi import APIRouter, UploadFile, File, HTTPException
from pathlib import Path

from backend.app.services.pdf_parser import extract_text_from_pdf


router = APIRouter(
    prefix="/job",
    tags=["Job Description"]
)


UPLOAD_FOLDER = Path("backend/uploads")

UPLOAD_FOLDER.mkdir(
    parents=True,
    exist_ok=True
)


JOB_FILE = UPLOAD_FOLDER / "current_job_description.pdf"


@router.post("/upload")
async def upload_job_description(
    file: UploadFile = File(...)
):

    if not file.filename.lower().endswith(".pdf"):

        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported."
        )

    # Save the uploaded job description
    # using a fixed name
    file_content = await file.read()

    with open(JOB_FILE, "wb") as buffer:
        buffer.write(file_content)

    # Extract text
    text = extract_text_from_pdf(
        str(JOB_FILE)
    )

    return {
        "original_filename": file.filename,
        "saved_as": JOB_FILE.name,
        "message": "Job description uploaded successfully",
        "characters_extracted": len(text),
        "text_preview": text[:1000]
    }