# /home/obed/Documents/free-webinar-sales/backend/schemas.py

from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class LeadCreate(BaseModel):
    """Payload from the opt-in registration form."""

    first_name: str = Field(..., min_length=1, max_length=120)
    last_name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    phone: str | None = Field(default=None, max_length=50)
    city: str = Field(..., min_length=1, max_length=120)
    country: str = Field(..., min_length=1, max_length=120)
    industry: str = Field(..., min_length=1, max_length=120)
    job_title: str = Field(..., min_length=1, max_length=120)
    questions_comments: str = Field(..., min_length=1, max_length=2000)

    source: str = Field(default="opt-in-page", max_length=120)
    utm_source: str | None = None
    utm_medium: str | None = None
    utm_campaign: str | None = None


class LeadResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    first_name: str
    last_name: str
    email: EmailStr
    ghl_synced: str
    created_at: datetime
    # The Zoom registration link the frontend should redirect the user to.
    zoom_registration_url: str


class OrderCreate(BaseModel):
    """Payload when a registrant opts into a VIP/Platinum upsell."""

    email: EmailStr
    product: str = Field(..., pattern="^(vip|platinum)$")


class OrderResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    email: EmailStr
    product: str
    amount_cents: int
    status: str
    created_at: datetime
