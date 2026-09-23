from fastapi import FastAPI

from schema import MessageResponse

app = FastAPI(title="Photobooth API")


@app.get("/", response_model=MessageResponse)
def read_root() -> MessageResponse:
    return MessageResponse(message="Photobooth API is running.")
