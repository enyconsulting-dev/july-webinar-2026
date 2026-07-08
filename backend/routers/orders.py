# /home/obed/Documents/free-webinar-sales/backend/routers/orders.py

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from models import Lead, Order
from schemas import OrderCreate, OrderResponse

router = APIRouter(prefix="/api/orders", tags=["orders"])

# Placeholder pricing. Payment is handled by GHL/Stripe checkout links for now;
# this endpoint records the intent so upsell take-rates are trackable.
PRODUCT_PRICING = {
    "vip": 4700,       # $47.00
    "platinum": 9700,  # $97.00
}


@router.post("", response_model=OrderResponse, status_code=201)
async def create_order(
    payload: OrderCreate,
    db: AsyncSession = Depends(get_db),
) -> OrderResponse:
    """Record an upsell order intent (VIP or Platinum)."""
    amount = PRODUCT_PRICING[payload.product]

    # Attach the GHL contact id if we already have this lead.
    result = await db.execute(select(Lead).where(Lead.email == payload.email))
    lead = result.scalars().first()

    order = Order(
        email=payload.email,
        product=payload.product,
        amount_cents=amount,
        status="initiated",
        ghl_contact_id=lead.ghl_contact_id if lead else None,
    )
    db.add(order)
    await db.commit()
    await db.refresh(order)
    return order
