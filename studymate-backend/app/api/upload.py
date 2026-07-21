from fastapi import APIRouter, UploadFile, File, HTTPException

from utils.pdf_reader import extract_text_from_pdf
from app.services.ai_service import ask_claude

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)


@router.post("/pdf")
async def upload_pdf(
    file: UploadFile = File(...)
):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a PDF file."
        )

    text = extract_text_from_pdf(file.file)

    return {
        "filename": file.filename,
        "text": text
    }


@router.post("/summarize")
async def upload_and_summarize(
    file: UploadFile = File(...)
):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a PDF file."
        )

    text = extract_text_from_pdf(file.file)

    prompt = f"""
    Summarize the following study material in simple bullet points.

    {text}
    """

    summary = ask_claude(prompt)

    return {
        "filename": file.filename,
        "summary": summary
    }