// /home/obed/Documents/free-webinar-sales/frontend/src/pages/VipCheckoutPage.tsx

import CheckoutEmbedZone from "../components/CheckoutEmbedZone";
import OrderSummary from "../components/OrderSummary";
import Reveal from "../components/Reveal";
import ResponsiveVideo from "../components/ResponsiveVideo";
import { createOrder } from "../api";
import { config } from "../config";
import { useCurrency } from "../context/CurrencyContext";

export default function VipCheckoutPage() {
  const email = sessionStorage.getItem("lead_email") ?? "";
  const { currency } = useCurrency();
  const isNgn = currency === "NGN";
  const priceLabel = isNgn ? "₦10,000" : "$27";
  const checkoutUrl = config.vipCheckoutUrl[currency];

  async function handleProceed() {
    await createOrder(email, "vip");
    sessionStorage.setItem("has_vip", "true");
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

      {/* ---------- VIDEO ---------- */}
      <section className="container-tight pb-10">
        <Reveal>
          <ResponsiveVideo videoId="1211632584" className="mx-auto" />
        </Reveal>
      </section>

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
              { label: "Total Value", value: isNgn ? "₦25,000+" : "$67+" },
              {
                label: "Billing",
                value: "One-time payment. No subscription. No hidden fees.",
              },
            ]}
            priceLabel="Your Price Today"
            price={priceLabel}
          />
        </Reveal>

        <Reveal delay={0.1}>
          <CheckoutEmbedZone
            ctaText={`Complete My VIP Pass Order — ${priceLabel}`}
            checkoutUrl={checkoutUrl}
            microcopy="You will receive an order confirmation and all VIP Pass materials to the email you registered with. Delivery is instant."
            onProceed={handleProceed}
          />
        </Reveal>
      </div>
    </main>
  );
}
