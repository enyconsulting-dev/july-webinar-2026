
import asyncio
import base64
import json
import logging

from config import settings

logger = logging.getLogger("google_sheets")


def _decode_credentials(raw: str) -> dict | None:
    """
    Cleans and decodes a base64-encoded service account JSON string.
    Strips ALL whitespace (spaces, tabs, real or escaped newlines) before
    decoding, since valid base64 never legitimately contains whitespace —
    any whitespace present is corruption introduced by copy/paste or an
    env var UI wrapping a long value.
    """
    if not raw:
        return None

    # Strip every whitespace character, plus surrounding quotes some UIs add
    cleaned = "".join(raw.split()).strip('"').strip("'")

    # Fix base64 padding if needed
    padding = len(cleaned) % 4
    if padding:
        cleaned += "=" * (4 - padding)

    try:
        decoded_bytes = base64.b64decode(cleaned, validate=False)
        return json.loads(decoded_bytes.decode("utf-8"))
    except Exception:
        logger.warning("Failed to decode/parse Google Sheets credentials", exc_info=True)
        return None


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
    creds_b64 = (settings.google_sheets_credentials_b64 or "").strip()
    sheet_id = (settings.google_sheet_id or "").strip()

    if not creds_b64 or not sheet_id:
        logger.warning("Google Sheets not configured; skipping append for %s", email)
        return False

    info = _decode_credentials(creds_b64)
    if info is None:
        logger.warning("Google Sheets credentials invalid; skipping append for %s", email)
        return False

    def _do_append() -> bool:
        try:
            from google.oauth2.service_account import Credentials
            from googleapiclient.discovery import build

            creds = Credentials.from_service_account_info(
                info, scopes=["https://www.googleapis.com/auth/spreadsheets"]
            )
            service = build("sheets", "v4", credentials=creds, cache_discovery=False)

            service.spreadsheets().values().append(
                spreadsheetId=sheet_id,
                range="Sheet1!A:J",
                valueInputOption="USER_ENTERED",
                insertDataOption="INSERT_ROWS",
                body={"values": [[timestamp, first_name, last_name, email, phone, city, country, industry, job_title, comment]]},
            ).execute()
            return True
        except Exception:
            logger.warning("Failed to append lead to Google Sheet for %s", email, exc_info=True)
            return False

    try:
        return bool(await asyncio.to_thread(_do_append))
    except Exception:
        logger.warning("Unexpected error scheduling Sheets append for %s", email, exc_info=True)
        return False





# import asyncio
# import base64
# import binascii
# import json
# import logging
# import os
# from typing import Any

# from config import settings

# logger = logging.getLogger("google_sheets")


# async def append_lead_to_sheet(
#     timestamp: str,
#     first_name: str,
#     last_name: str,
#     email: str,
#     phone: str,
#     city: str,
#     country: str,
#     industry: str,
#     job_title: str,
#     comment: str,
# ) -> bool:
#     """Append a single lead row to the configured Google Sheet.

#     Returns True on success, False on any failure. Never raises.
#     """
#     creds_b64 = settings.google_sheets_credentials_b64 or ""
#     sheet_id = settings.google_sheet_id or ""

#     if not creds_b64.strip() or not sheet_id.strip():
#         logger.warning("Google Sheets not configured; skipping append for %s", email)
#         return False

#     def _do_append() -> bool:
#         try:
#             # Lazy import of google libs to avoid importing them when not configured
#             from google.oauth2.service_account import Credentials
#             from googleapiclient.discovery import build

#             # The environment value may be either a base64-encoded JSON string
#             # or the raw JSON. Try base64 decode first, then fall back to raw.
#             info = None
#             # Pre-clean common issues: surrounding quotes and escaped newlines
#             candidate = creds_b64.strip()

#             # If the value itself is a JSON string containing the real value
#             # (for example stored as '"ewog..."'), json.loads will unwrap it.
#             try:
#                 if (candidate.startswith('"') and candidate.endswith('"')) or (
#                     candidate.startswith("'") and candidate.endswith("'")
#                 ):
#                     candidate_unwrapped = json.loads(candidate)
#                     if isinstance(candidate_unwrapped, str):
#                         candidate = candidate_unwrapped
#             except Exception:
#                 # ignore unwrap errors, fall back to other strategies
#                 pass

#             # Remove literal backslash-n sequences often introduced by env editors
#             candidate = candidate.replace('\\n', '')
#             candidate = candidate.replace('\\r', '')

#             def try_base64_decode(s: str):
#                 padded = s
#                 padding = len(padded) % 4
#                 if padding:
#                     padded += '=' * (4 - padding)
#                 return base64.b64decode(padded)

#             info = None
#             # Strategy A: candidate is base64 of JSON
#             try:
#                 decoded = try_base64_decode(candidate)
#                 try:
#                     decoded_text = decoded.decode('utf-8')
#                 except Exception:
#                     decoded_text = decoded
#                 # decoded_text may itself be a JSON string or raw JSON
#                 try:
#                     info = json.loads(decoded_text)
#                 except json.JSONDecodeError:
#                     # Maybe decoded_text is a JSON string containing the JSON
#                     try:
#                         inner = json.loads(decoded_text)
#                         if isinstance(inner, str):
#                             info = json.loads(inner)
#                     except Exception:
#                         info = None
#             except (binascii.Error, UnicodeDecodeError):
#                 info = None

#             # Strategy B: candidate is raw JSON
#             if info is None:
#                 try:
#                     info = json.loads(candidate)
#                 except Exception:
#                     info = None

#             if info is None:
#                 masked = (candidate[:50] + "...") if len(candidate) > 50 else candidate
#                 logger.warning(
#                     "Google Sheets credentials could not be decoded as JSON; skipping append for %s (candidate start: %r)",
#                     email,
#                     masked,
#                 )
#                 return False

#             creds = Credentials.from_service_account_info(
#                 info, scopes=["https://www.googleapis.com/auth/spreadsheets"]
#             )

#             service = build("sheets", "v4", credentials=creds, cache_discovery=False)

#             values = [
#                 [
#                     timestamp,
#                     first_name,
#                     last_name,
#                     email,
#                     phone,
#                     city,
#                     country,
#                     industry,
#                     job_title,
#                     comment,
#                 ]
#             ]
#             body = {"values": values}

#             service.spreadsheets()
#             service.spreadsheets().values().append(
#                 spreadsheetId=sheet_id,
#                 range="Sheet1!A:J",
#                 valueInputOption="RAW",
#                 insertDataOption="INSERT_ROWS",
#                 body=body,
#             ).execute()
#             return True
#         except Exception:
#             logger.warning("Failed to append lead to Google Sheet for %s", email, exc_info=True)
#             return False

#     # Run blocking Google client code in a thread so we don't block the event loop.
#     try:
#         result = await asyncio.to_thread(_do_append)
#         return bool(result)
#     except Exception:
#         logger.warning("Unexpected error when scheduling Google Sheets append for %s", email, exc_info=True)
#         return False
