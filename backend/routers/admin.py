import csv
import io
import logging
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Query, Request
from fastapi.responses import StreamingResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from config import settings
from database import get_db
from models import Lead

logger = logging.getLogger("admin")
router = APIRouter(prefix="/api/admin", tags=["admin"])


def is_authorized_admin(expected_token: str, provided_token: str | None) -> bool:
    """Allow access when no token is configured or the provided token matches."""
    if not expected_token:
        return True
    return bool(provided_token and provided_token == expected_token)


def build_csv_payload(rows: list[dict[str, Any]]) -> str:
    output = io.StringIO()
    writer = csv.DictWriter(output, fieldnames=["name", "email"])
    writer.writeheader()
    for row in rows:
        writer.writerow({"name": row.get("name", ""), "email": row.get("email", "")})
    return output.getvalue()


async def _fetch_leads(db: AsyncSession) -> list[dict[str, Any]]:
    result = await db.execute(
        select(Lead.first_name, Lead.last_name, Lead.email)
        .order_by(Lead.created_at.desc())
    )
    rows = []
    for first_name, last_name, email in result.all():
        name = " ".join(part for part in [first_name, last_name] if part).strip()
        rows.append({"name": name, "email": email})
    return rows


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
