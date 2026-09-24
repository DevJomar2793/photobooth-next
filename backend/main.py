from fastapi import FastAPI, HTTPException

from database import check_database_connection
from schema import DatabaseConnectionResponse, MessageResponse

app = FastAPI(title="Photobooth API")


@app.get("/", response_model=MessageResponse)
def read_root() -> MessageResponse:
    return MessageResponse(message="Photobooth API is running.")


@app.get("/database/connection", response_model=DatabaseConnectionResponse)
def get_database_connection() -> DatabaseConnectionResponse:
    if check_database_connection():
        return DatabaseConnectionResponse(
            connected=True,
            message="Database connection successful.",
        )

    raise HTTPException(
        status_code=503,
        detail="Database connection failed. Check DATABASE_URL and PostgreSQL.",
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
