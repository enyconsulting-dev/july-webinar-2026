# /home/obed/Documents/free-webinar-sales/backend/routers/leads.py

import logging

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

import ghl
from app.integrations.pabbly import trigger_zoom_registration
from config import settings
from database import get_db
from models import Lead
from schemas import LeadCreate, LeadResponse

logger = logging.getLogger("leads")
router = APIRouter(prefix="/api/leads", tags=["leads"])


async def _sync_lead_to_ghl(lead_id: int, payload: LeadCreate) -> None:
    """Background task: push the lead to GHL and update its sync status."""
    # Imported here to avoid a circular import at module load.
    from database import AsyncSessionLocal

    result = await ghl.upsert_contact(payload)
    await ghl.fire_webhook(payload)

    async with AsyncSessionLocal() as db:
        lead = await db.get(Lead, lead_id)
        if lead is None:
            return
        if result.ok:
            lead.ghl_synced = "synced"
            lead.ghl_contact_id = result.contact_id
            lead.ghl_error = None
        else:
            lead.ghl_synced = "failed"
            lead.ghl_error = result.error
        await db.commit()


@router.post("", response_model=LeadResponse, status_code=201)
async def create_lead(
    payload: LeadCreate,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
) -> LeadResponse:
    """Capture a masterclass registrant and forward to GHL asynchronously."""
    lead = Lead(
        first_name=payload.first_name,
        last_name=payload.last_name,
        email=payload.email,
        phone=payload.phone,
        source=payload.source,
        utm_source=payload.utm_source,
        utm_medium=payload.utm_medium,
        utm_campaign=payload.utm_campaign,
    )
    try:
        db.add(lead)
        await db.commit()
        await db.refresh(lead)
    except Exception as exc:
        logger.exception("Lead persistence failed")
        raise HTTPException(
            status_code=503,
            detail="Registration service is temporarily unavailable. Please try again shortly.",
        ) from exc

    # Forward to GHL without blocking the response.
    background_tasks.add_task(_sync_lead_to_ghl, lead.id, payload)
    # Pabbly now sends the Zoom registration confirmation email directly, so this is intentionally not used here.
    background_tasks.add_task(
        trigger_zoom_registration,
        lead.email,
        lead.first_name,
        lead.last_name,
    )

    return LeadResponse(
        id=lead.id,
        first_name=lead.first_name,
        last_name=lead.last_name,
        email=lead.email,
        ghl_synced=lead.ghl_synced,
        created_at=lead.created_at,
        zoom_registration_url=settings.zoom_registration_url,
    )
