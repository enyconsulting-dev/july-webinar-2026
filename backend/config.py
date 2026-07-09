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
    # A GHL API key (v1 Location key) OR a v2 OAuth access token / Private Integration token.
    ghl_api_key: str = ""
    # Location / sub-account id (required for v2 API contact upsert).
    ghl_location_id: str = ""
    # Base URL for the GHL REST API. v2 default shown; v1 users can override.
    ghl_api_base: str = "https://services.leadconnectorhq.com"
    # Optional: an inbound webhook URL in GHL (Workflows) to also fire on new leads.
    ghl_webhook_url: str = ""
    # API version header value used by GHL v2.
    ghl_api_version: str = "2021-07-28"

    # --- Event / Zoom ---
    zoom_registration_url: str = (
        "https://us06web.zoom.us/meeting/register/kZIx9YQbSBi-GbYHGHCBrg"
    )

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
