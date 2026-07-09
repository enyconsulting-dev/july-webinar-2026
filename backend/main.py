# /home/obed/Documents/free-webinar-sales/backend/main.py

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from database import init_db
from routers import leads, orders

logging.basicConfig(level=logging.INFO)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables on startup (use Alembic migrations in production).
    try:
        await init_db()
        logging.info("Database initialized successfully")
    except Exception as exc:
        logging.warning("Database initialization failed at startup: %s", exc)
    yield


app = FastAPI(title=settings.app_name, lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(leads.router)
app.include_router(orders.router)


@app.get("/api/health")
async def health() -> dict:
    return {"status": "ok", "environment": settings.environment}


@app.get("/api/config")
async def public_config() -> dict:
    """Non-secret config the frontend may read (e.g. the Zoom link)."""
    return {"zoom_registration_url": settings.zoom_registration_url}
