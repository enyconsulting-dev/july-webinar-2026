import logging

import httpx

from config import settings

logger = logging.getLogger("pabbly")


async def trigger_zoom_registration(email: str, first_name: str, last_name: str = "") -> bool:
    """Send a lead payload to Pabbly Connect for Zoom registration and email delivery."""
    if not settings.pabbly_webhook_url or not settings.pabbly_webhook_url.strip():
        logger.warning("PABBLY_WEBHOOK_URL is not configured; skipping Zoom registration trigger")
        return False

    payload = {
        "email": email,
        "first_name": first_name,
        "last_name": last_name,
    }

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(settings.pabbly_webhook_url, json=payload)
            response.raise_for_status()
    except Exception:
        logger.warning("Pabbly webhook call failed for Zoom registration trigger", exc_info=True)
        return False

    return True
