# /home/obed/Documents/free-webinar-sales/backend/database.py

from collections.abc import AsyncGenerator

from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import DeclarativeBase

from config import settings


class Base(DeclarativeBase):
    """Base class for all ORM models."""


engine = create_async_engine(
    settings.database_url,
    echo=settings.environment == "development",
    pool_pre_ping=True,
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """FastAPI dependency that yields a database session."""
    async with AsyncSessionLocal() as session:
        yield session


async def init_db() -> None:
    """Create tables on startup. For production, prefer Alembic migrations."""
    from models import Lead, Order  # noqa: F401  (ensure models are imported)

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
