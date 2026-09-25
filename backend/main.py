from fastapi import FastAPI

from database import Base, engine
from routes.health import router as health_router
from routes.images import router as images_router

app = FastAPI(title="Photobooth API")

@app.on_event("startup")
def create_database_tables() -> None:
    if engine is not None:
        Base.metadata.create_all(bind=engine)


app.include_router(health_router)
app.include_router(images_router)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
