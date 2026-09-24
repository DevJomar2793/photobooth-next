from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from database import get_db
from models import Image
from schema import ImageUploadResponse

router = APIRouter()

MAX_IMAGE_SIZE = 10 * 1024 * 1024

# Upload images endpoint
@router.post(
    "/images",
    response_model=ImageUploadResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_image(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
) -> ImageUploadResponse:
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files are allowed.")

    image_data = await file.read()

    if not image_data:
        raise HTTPException(status_code=400, detail="The image file is empty.")

    if len(image_data) > MAX_IMAGE_SIZE:
        raise HTTPException(status_code=400, detail="Image files must be 10 MB or smaller.")

    image = Image(
        filename=file.filename or "image",
        content_type=file.content_type,
        image_data=image_data,
    )

    try:
        db.add(image)
        db.commit()
        db.refresh(image)
    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(status_code=500, detail="Unable to save the image.")
    finally:
        await file.close()

    return ImageUploadResponse(
        id=image.id,
        filename=image.filename,
        content_type=image.content_type,
        created_at=image.created_at,
    )
