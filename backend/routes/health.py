from fastapi import APIRouter, HTTPException

from database import check_database_connection
from schema import DatabaseConnectionResponse, MessageResponse

router = APIRouter()

# Check if API is running.
@router.get("/", response_model=MessageResponse)
def read_root() -> MessageResponse:
    return MessageResponse(message="Photobooth API is running.")

# Check if database connection is successful.
@router.get("/database/connection", response_model=DatabaseConnectionResponse)
def get_database_connection() -> DatabaseConnectionResponse:
    if check_database_connection():
        return DatabaseConnectionResponse(
            connected=True,
            message="Database connection successful.",
        )

    raise HTTPException(
        status_code=503,
        detail="Database connection failed. Check database settings and PostgreSQL.",
    )
