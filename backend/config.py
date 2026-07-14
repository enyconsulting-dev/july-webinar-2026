# /home/obed/Documents/free-webinar-sales/backend/config.py

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application configuration, loaded from environment / .env file."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # --- App ---
    app_name: str = "Eno Eka Webinar Funnel API"
    environment: str = "development"

    # Comma-separated list of allowed CORS origins (the frontend URLs).
    cors_origins: str = (
        "http://localhost:5173,http://127.0.0.1:5173,"
        "https://july-webinar-2026.vercel.app"
    )

    # --- Database (PostgreSQL) ---
    # Example: postgresql+asyncpg://user:password@localhost:5432/webinar_funnel
    database_url: str = (
        "postgresql+asyncpg://postgres:postgres@localhost:5432/webinar_funnel"
    )

    # --- GoHighLevel (GHL) ---
    # Private Integration Token (PIT) only. Create it in GHL:
    # Settings > Private Integrations. Legacy V1 "Location API keys" are
    # deprecated (V1 API end-of-support Dec 31, 2025) and are NOT supported.
    ghl_api_key: str = ""
    # Location / sub-account id (required for the contacts upsert endpoint).
    ghl_location_id: str = ""
    # Base URL for the GHL (LeadConnector) v2 REST API.
    ghl_api_base: str = "https://services.leadconnectorhq.com"
    # Optional: an inbound webhook URL in GHL (Workflows) to also fire on new leads.
    # This is separate from the direct contact upsert and is not a replacement for it.
    ghl_webhook_url: str = ""
    # API version header value required by the GHL v2 API.
    ghl_api_version: str = "2021-07-28"
    # GHL calendar id from Calendars > [calendar] > Settings > embed code.
    # Used to build the "Add to Calendar" booking widget on the thank-you page.
    ghl_calendar_id: str = ""

    # --- Admin export ---
    admin_export_token: str = ""
    admin_email: str = ""
    admin_password: str = ""

    # --- Event / Zoom ---
    zoom_registration_url: str = (
        "https://us06web.zoom.us/meeting/register/kZIx9YQbSBi-GbYHGHCBrg"
    )
    pabbly_webhook_url: str = ""

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]

    @property
    def ghl_calendar_url(self) -> str:
        """Public GHL booking-widget URL for the configured calendar, or ""."""
        if not self.ghl_calendar_id:
            return ""
        return (
            f"{self.ghl_api_base.rstrip('/')}/widget/booking/{self.ghl_calendar_id}"
        )


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()


# Substrings that mean a value is still a copied-from-example placeholder.
_PLACEHOLDER_MARKERS = ("[YOUR-PASSWORD]", "[PROJECT-REF]", "changeme", "your-", "xxxx")

# Env vars that must be set for a real deployment.
#   Required (all environments): DATABASE_URL
#   Required for GHL lead sync:   GHL_API_KEY, GHL_LOCATION_ID
#   Optional:                     GHL_WEBHOOK_URL, GHL_CALENDAR_ID,
#                                 ZOOM_REGISTRATION_URL (has a safe default)
REQUIRED_ENV = {
    "DATABASE_URL": lambda s: s.database_url,
    "GHL_API_KEY": lambda s: s.ghl_api_key,
    "GHL_LOCATION_ID": lambda s: s.ghl_location_id,
}


def _looks_like_placeholder(value: str) -> bool:
    return any(marker in value for marker in _PLACEHOLDER_MARKERS)


def _uses_local_database(value: str) -> bool:
    return "localhost" in value or "127.0.0.1" in value


def validate_required_env(s: Settings) -> list[str]:
    """Return a list of human-readable problems with required env vars."""
    problems: list[str] = []
    for name, getter in REQUIRED_ENV.items():
        value = (getter(s) or "").strip()
        if not value:
            problems.append(f"{name} is missing")
        elif _looks_like_placeholder(value):
            problems.append(f"{name} is still set to a placeholder value")
        elif name == "DATABASE_URL" and s.environment == "production" and _uses_local_database(value):
            problems.append("DATABASE_URL still points to a local development database in production")
    return problems
