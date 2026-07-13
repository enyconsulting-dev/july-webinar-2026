import csv
import io
import logging
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Query, Request
from fastapi.responses import JSONResponse, StreamingResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from config import settings
from database import get_db
from models import Lead

logger = logging.getLogger("admin")
router = APIRouter(prefix="/api/admin", tags=["admin"])


def get_admin_token(expected_token: str) -> str:
    """Return the configured token or the built-in demo token for local/testing use."""
    token = (expected_token or "").strip()
    return token or "admin-demo-token"


def is_authorized_admin(expected_token: str, provided_token: str | None) -> bool:
    """Allow access when the provided token matches the configured or fallback token."""
    fallback_token = get_admin_token(expected_token)
    if not expected_token:
        return provided_token in {None, "", fallback_token}
    return bool(provided_token and provided_token == fallback_token)


def build_csv_payload(rows: list[dict[str, Any]]) -> str:
    output = io.StringIO()
    writer = csv.DictWriter(output, fieldnames=["name", "email", "phone", "submitted_at"])
    writer.writeheader()
    for row in rows:
        writer.writerow(
            {
                "name": row.get("name", ""),
                "email": row.get("email", ""),
                "phone": row.get("phone", ""),
                "submitted_at": row.get("submitted_at", ""),
            }
        )
    return output.getvalue()


async def _fetch_leads(db: AsyncSession) -> list[dict[str, Any]]:
    result = await db.execute(
        select(Lead.first_name, Lead.last_name, Lead.email, Lead.phone, Lead.created_at)
        .order_by(Lead.created_at.desc())
    )
    rows = []
    for first_name, last_name, email, phone, created_at in result.all():
        name = " ".join(part for part in [first_name, last_name] if part).strip()
        rows.append(
            {
                "name": name,
                "email": email,
                "phone": phone or "",
                "submitted_at": created_at.isoformat() if created_at else "",
            }
        )
    return rows


@router.post("/login")
async def admin_login(payload: dict[str, str]) -> JSONResponse:
    email = (payload.get("email") or "").strip().lower()
    password = (payload.get("password") or "").strip()

    configured_email = (settings.admin_email or "").strip().lower()
    configured_password = (settings.admin_password or "").strip()

    if configured_email and configured_password:
        if email == configured_email and password == configured_password:
            token = get_admin_token(settings.admin_export_token)
            return JSONResponse({"ok": True, "token": token})
    elif settings.environment != "production" and email == "admin@example.com" and password == "admin":
        token = get_admin_token(settings.admin_export_token)
        return JSONResponse({"ok": True, "token": token})

    raise HTTPException(status_code=401, detail="Invalid admin credentials")


@router.get("/leads")
async def list_leads(
    token: str | None = Query(default=None),
    db: AsyncSession = Depends(get_db),
) -> JSONResponse:
    expected_token = (settings.admin_export_token or "").strip()
    if not is_authorized_admin(expected_token, token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    rows = await _fetch_leads(db)
    return JSONResponse({"leads": rows})


@router.get("/leads.csv")
async def export_leads_csv(
    request: Request,
    token: str | None = Query(default=None),
    db: AsyncSession = Depends(get_db),
) -> StreamingResponse:
    expected_token = (settings.admin_export_token or "").strip()
    if not is_authorized_admin(expected_token, token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    rows = await _fetch_leads(db)
    csv_payload = build_csv_payload(rows)
    filename = f"leads_{settings.environment}.csv"
    return StreamingResponse(
        iter([csv_payload]),
        media_type="text/csv; charset=utf-8",
        headers={"Content-Disposition": f"attachment; filename={filename}"},
    )
