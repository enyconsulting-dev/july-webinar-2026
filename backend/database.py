# /home/obed/Documents/free-webinar-sales/backend/database.py

from collections.abc import AsyncGenerator
from typing import Any

from sqlalchemy.engine.url import make_url
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import DeclarativeBase

from config import settings


class Base(DeclarativeBase):
    """Base class for all ORM models."""


def build_async_engine_kwargs(database_url: str, *, echo: bool = False) -> dict[str, Any]:
    """Build engine kwargs while translating common SSL query params for asyncpg."""
    url = make_url(database_url)
    query = dict(url.query)
    sslmode = query.pop("sslmode", None)

    connect_args: dict[str, Any] = {}
    if sslmode in {"require", "verify-ca", "verify-full"}:
        connect_args["ssl"] = True
    elif sslmode in {"disable", "allow", "prefer"}:
        connect_args["ssl"] = False

    url = url.set(query=query)

    return {
        "echo": echo,
        "pool_pre_ping": True,
        "connect_args": connect_args,
        "url": url,
    }


engine = create_async_engine(
    **build_async_engine_kwargs(
        settings.database_url,
        echo=settings.environment == "development",
    )
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
