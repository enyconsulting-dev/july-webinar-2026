# /home/obed/Documents/free-webinar-sales/backend/ghl.py

"""Thin GoHighLevel (GHL) client.

Forwards captured leads to GHL as contacts and optionally fires an inbound
workflow webhook. Designed to fail soft: if GHL is not configured or errors,
the lead is still persisted locally and the caller is told sync is pending.
"""

import logging

import httpx

from config import settings
from schemas import LeadCreate

logger = logging.getLogger("ghl")


class GHLResult:
    def __init__(self, ok: bool, contact_id: str | None = None, error: str | None = None):
        self.ok = ok
        self.contact_id = contact_id
        self.error = error


async def upsert_contact(lead: LeadCreate) -> GHLResult:
    """Create/update a contact in GHL and add funnel tags.

    Uses the GHL v2 (LeadConnector) contacts upsert endpoint. If credentials
    are missing, returns a soft failure so the lead is still stored locally.
    """
    if not settings.ghl_api_key or not settings.ghl_location_id:
        logger.warning("GHL not configured; skipping contact upsert.")
        return GHLResult(ok=False, error="GHL not configured")

    payload = {
        "firstName": lead.first_name,
        "lastName": lead.last_name,
        "email": lead.email,
        "phone": lead.phone,
        "locationId": settings.ghl_location_id,
        "source": lead.source,
        "tags": ["masterclass-registrant", "webinar-funnel"],
    }
    if lead.utm_source or lead.utm_medium or lead.utm_campaign:
        payload["customFields"] = [
            {"key": "utm_source", "value": lead.utm_source or ""},
            {"key": "utm_medium", "value": lead.utm_medium or ""},
            {"key": "utm_campaign", "value": lead.utm_campaign or ""},
        ]

    headers = {
        "Authorization": f"Bearer {settings.ghl_api_key}",
        "Version": settings.ghl_api_version,
        "Content-Type": "application/json",
    }

    url = f"{settings.ghl_api_base.rstrip('/')}/contacts/upsert"

    try:
        async with httpx.AsyncClient(timeout=15) as client:
            resp = await client.post(url, json=payload, headers=headers)
            resp.raise_for_status()
            data = resp.json()
            contact = data.get("contact", data)
            contact_id = contact.get("id") or contact.get("contactId")
            logger.info("GHL contact upserted: %s", contact_id)
            return GHLResult(ok=True, contact_id=contact_id)
    except httpx.HTTPStatusError as exc:
        detail = f"{exc.response.status_code}: {exc.response.text[:500]}"
        logger.error("GHL upsert failed: %s", detail)
        return GHLResult(ok=False, error=detail)
    except httpx.HTTPError as exc:
        logger.error("GHL upsert network error: %s", exc)
        return GHLResult(ok=False, error=str(exc))


async def fire_webhook(lead: LeadCreate) -> None:
    """Optionally POST the raw lead to a GHL Workflow inbound webhook."""
    if not settings.ghl_webhook_url:
        return
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            await client.post(settings.ghl_webhook_url, json=lead.model_dump())
    except httpx.HTTPError as exc:  # non-fatal
        logger.warning("GHL webhook failed: %s", exc)
