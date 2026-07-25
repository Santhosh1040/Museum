from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.database import engine
from app.routers.users import router as user_router
from app.routers.artist import router as artist_router
from app.routers.artwork import router as artwork_router
from app.routers.dashboard import router as dashboard_router


app = FastAPI(
    title="Museum Collection API",
    version="1.0.0"
)

# Enable CORS so the React frontend can access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routers
app.include_router(user_router)
app.include_router(artist_router)
app.include_router(artwork_router)
app.include_router(dashboard_router)


@app.get("/")
def root():
    return {
        "message": "Museum Collection API is running!"
    }


@app.get("/health")
def health():
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))

        return {
            "status": "success",
            "database": "Connected"
        }

    except Exception as e:
        return {
            "status": "failed",
            "error": str(e)
        }