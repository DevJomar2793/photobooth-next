from fastapi import APIRouter, Depends, File, HTTPException, Response, UploadFile, status
from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from database import get_db
from models import Image
from schema import ImageListItemResponse, ImageUploadResponse

router = APIRouter()

MAX_IMAGE_SIZE = 10 * 1024 * 1024

# Upload images endpoint
@router.post(
    "/upload-image",
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


@router.get("/list-of-image", response_model=list[ImageListItemResponse])
def get_images(db: Session = Depends(get_db)) -> list[ImageListItemResponse]:
    try:
        images = db.scalars(
            select(Image).order_by(Image.created_at.desc())
        ).all()
    except SQLAlchemyError:
        raise HTTPException(status_code=500, detail="Unable to load images.")

    return [
        ImageListItemResponse(
            id=image.id,
            filename=image.filename,
            content_type=image.content_type,
            created_at=image.created_at,
            image_url=f"/images/{image.id}",
        )
        for image in images
    ]


@router.get("/image/{image_id}")
def get_image(
    image_id: int,
    db: Session = Depends(get_db),
) -> Response:
    try:
        image = db.get(Image, image_id)
    except SQLAlchemyError:
        raise HTTPException(status_code=500, detail="Unable to load the image.")

    if image is None:
        raise HTTPException(status_code=404, detail="Image not found.")

    return Response(content=image.image_data, media_type=image.content_type)
