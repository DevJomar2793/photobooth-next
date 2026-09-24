from datetime import datetime

from pydantic import BaseModel


class MessageResponse(BaseModel):
    message: str


class DatabaseConnectionResponse(BaseModel):
    connected: bool
    message: str


class ImageUploadResponse(BaseModel):
    id: int
    filename: str
    content_type: str
    created_at: datetime
