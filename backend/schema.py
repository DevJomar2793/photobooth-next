from pydantic import BaseModel


class MessageResponse(BaseModel):
    message: str


class DatabaseConnectionResponse(BaseModel):
    connected: bool
    message: str
