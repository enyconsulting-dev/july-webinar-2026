import logging
from typing import Any

from fastapi import APIRouter, HTTPException, Request

from config import settings
from ghl import upsert_contact
from schemas import LeadCreate

router = APIRouter(prefix="/api/webhooks", tags=["webhooks"])
logger = logging.getLogger("webhooks")


@router.post("/paystack")
async def paystack_webhook(request: Request) -> dict[str, Any]:
    """Receive Paystack charge.success events and mark the lead as purchased.

    This is intentionally lightweight: it validates that the event looks like a
    successful charge and then triggers the same GHL contact update path used
    by the lead sync flow so the CRM is updated after payment success.
    """
    payload = await request.json()
    event = payload.get("event")
    data = payload.get("data") or {}

    if event != "charge.success":
        return {"status": "ignored", "reason": "event-not-supported"}

    email = (data.get("customer") or {}).get("email")
    if not email:
        raise HTTPException(status_code=400, detail="missing-customer-email")

    logger.info("Paystack webhook received for %s", email)

    lead = LeadCreate(
        first_name="",
        last_name="",
        email=email,
        phone=None,
        source="paystack-webhook",
    )
    result = await upsert_contact(lead)
    return {
        "status": "ok",
        "ghl_synced": result.ok,
        "contact_id": result.contact_id,
        "error": result.error,
    }


@router.post("/foreign-checkout")
async def foreign_checkout_webhook(request: Request) -> dict[str, Any]:
    """Placeholder webhook for the foreign hosted checkout platform.

    The implementation depends on the provider behind
    course.businessanalysisschool.com. This endpoint intentionally does not
    guess at payload shapes or provider-specific fields.
    """
    payload = await request.json()
    logger.info("Foreign checkout webhook received: %s", payload)
    return {"status": "pending", "message": "implementation-required"}
