# /home/obed/Documents/free-webinar-sales/backend/main.py

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings, validate_required_env
from database import init_db
from routers import leads, orders
from routers import webhooks

logging.basicConfig(level=logging.INFO)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Fail loudly on boot if required env vars are missing/placeholder, rather
    # than failing silently on the first request. Hard-fail in production;
    # warn in development so local work without GHL creds still boots.
    problems = validate_required_env(settings)
    if problems:
        message = "Environment validation failed:\n" + "\n".join(
            f"  - {p}" for p in problems
        )
        if settings.environment == "production":
            raise RuntimeError(message)
        logging.warning(
            "%s\n(continuing because ENVIRONMENT is '%s', not 'production')",
            message,
            settings.environment,
        )

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
app.include_router(webhooks.router)


@app.get("/api/health")
async def health() -> dict:
    return {"status": "ok", "environment": settings.environment}


@app.get("/api/config")
async def public_config() -> dict:
    """Non-secret config the frontend reads (Zoom link, GHL calendar URL)."""
    return {
        "zoom_registration_url": settings.zoom_registration_url,
        # "" when GHL_CALENDAR_ID is not configured — frontend hides the button.
        "ghl_calendar_url": settings.ghl_calendar_url,
    }
