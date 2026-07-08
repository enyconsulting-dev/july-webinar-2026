// /home/obed/Documents/free-webinar-sales/frontend/src/pages/VipCheckoutPage.tsx

import { useNavigate } from "react-router-dom";

import CheckoutEmbedZone from "../components/CheckoutEmbedZone";
import OrderSummary from "../components/OrderSummary";
import Reveal from "../components/Reveal";
import { createOrder } from "../api";
import { config } from "../config";

export default function VipCheckoutPage() {
  const navigate = useNavigate();
  const email = sessionStorage.getItem("lead_email") ?? "";

  async function handleProceed() {
    await createOrder(email, "vip");
    sessionStorage.setItem("has_vip", "true");
    navigate("/vip-confirmed");
  }

  return (
    <main className="container-tight py-14">
      <Reveal>
        <div className="text-center">
          <span className="eyebrow">Almost Done — Complete Your VIP Pass Upgrade</span>
          <h1 className="mx-auto mt-5 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">
            You Are One Step Away From Showing Up{" "}
            <span className="text-gold-gradient">Prepared, Prioritized, and Ready to Launch</span>
          </h1>
          <p className="mt-4 text-cream/70">Complete your order below.</p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <OrderSummary
            rows={[
              {
                label: "Event",
                value:
                  "How I Went From Accountant to Building a Multi-Million Dollar Global Consulting Company",
              },
              { label: "VIP Pass Includes", value: "90-Day Launch Workbook" },
              { label: "Total Value", value: "$497" },
              {
                label: "Billing",
                value: "One-time payment. No subscription. No hidden fees.",
              },
            ]}
            priceLabel="Your Price Today"
            price="$47"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <CheckoutEmbedZone
            ctaText="Complete My VIP Pass Order — $47"
            checkoutUrl={config.vipCheckoutUrl}
            microcopy="You will receive an order confirmation and all VIP Pass materials to the email you registered with. Delivery is instant."
            onProceed={handleProceed}
          />
        </Reveal>
      </div>
    </main>
  );
}
