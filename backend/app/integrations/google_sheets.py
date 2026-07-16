import asyncio
import base64
import binascii
import json
import logging
import os
from typing import Any

from config import settings

logger = logging.getLogger("google_sheets")


async def append_lead_to_sheet(
    timestamp: str,
    first_name: str,
    last_name: str,
    email: str,
    phone: str,
    city: str,
    country: str,
    industry: str,
    job_title: str,
    comment: str,
) -> bool:
    """Append a single lead row to the configured Google Sheet.

    Returns True on success, False on any failure. Never raises.
    """
    creds_b64 = settings.google_sheets_credentials_b64 or ""
    sheet_id = settings.google_sheet_id or ""

    if not creds_b64.strip() or not sheet_id.strip():
        logger.warning("Google Sheets not configured; skipping append for %s", email)
        return False

    def _do_append() -> bool:
        try:
            # Lazy import of google libs to avoid importing them when not configured
            from google.oauth2.service_account import Credentials
            from googleapiclient.discovery import build

            # The environment value may be either a base64-encoded JSON string
            # or the raw JSON. Try base64 decode first, then fall back to raw.
            info = None
            try:
                decoded = base64.b64decode(creds_b64)
                info = json.loads(decoded)
            except (binascii.Error, json.JSONDecodeError):
                try:
                    info = json.loads(creds_b64)
                except json.JSONDecodeError:
                    # Attempt a forgiving strip of surrounding quotes/newlines
                    try:
                        stripped = creds_b64.strip().strip('"')
                        info = json.loads(stripped)
                    except Exception:
                        logger.warning(
                            "Google Sheets credentials could not be decoded as JSON; skipping append for %s",
                            email,
                        )
                        return False

            creds = Credentials.from_service_account_info(
                info, scopes=["https://www.googleapis.com/auth/spreadsheets"]
            )

            service = build("sheets", "v4", credentials=creds, cache_discovery=False)

            values = [
                [
                    timestamp,
                    first_name,
                    last_name,
                    email,
                    phone,
                    city,
                    country,
                    industry,
                    job_title,
                    comment,
                ]
            ]
            body = {"values": values}

            service.spreadsheets()
            service.spreadsheets().values().append(
                spreadsheetId=sheet_id,
                range="Sheet1!A:J",
                valueInputOption="RAW",
                insertDataOption="INSERT_ROWS",
                body=body,
            ).execute()
            return True
        except Exception:
            logger.warning("Failed to append lead to Google Sheet for %s", email, exc_info=True)
            return False

    # Run blocking Google client code in a thread so we don't block the event loop.
    try:
        result = await asyncio.to_thread(_do_append)
        return bool(result)
    except Exception:
        logger.warning("Unexpected error when scheduling Google Sheets append for %s", email, exc_info=True)
        return False
