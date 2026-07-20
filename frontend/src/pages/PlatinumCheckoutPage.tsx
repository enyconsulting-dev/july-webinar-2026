// /home/obed/Documents/free-webinar-sales/frontend/src/pages/PlatinumCheckoutPage.tsx

import CheckoutEmbedZone from "../components/CheckoutEmbedZone";
import OrderSummary from "../components/OrderSummary";
import Reveal from "../components/Reveal";
import { createOrder } from "../api";
import { config } from "../config";
import { useCurrency } from "../context/CurrencyContext";

export default function PlatinumCheckoutPage() {
  const email = sessionStorage.getItem("lead_email") ?? "";
  const { currency } = useCurrency();
  const isNgn = currency === "NGN";
  const priceLabel = isNgn ? "₦25,000" : "$67";
  const checkoutUrl = config.platinumCheckoutUrl[currency];

  async function handleProceed() {
    await createOrder(email, "platinum");
    sessionStorage.setItem("has_platinum", "true");
  }

  return (
    <main className="container-tight py-14">
      <Reveal>
        <div className="text-center">
          <span className="eyebrow">Final Step — Complete Your Platinum Pass Upgrade</span>
          <h1 className="mx-auto mt-5 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">
            Get the Full Consulting Launch Toolkit{" "}
            <span className="text-gold-gradient">Delivered to Your Inbox Today</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-cream/70">
            You are seconds away from a proposal template, a client outreach swipe file, a
            pricing framework, and a reserved seat at the live working session — all in
            your hands before the masterclass even starts.
          </p>
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
              {
                label: "Platinum Pass Includes",
                value:
                  "Everything in VIP + Quick-Start Kit + Done-For-You Templates + Live Working Session + Priority Seat",
              },
              { label: "Total Value", value: isNgn ? "₦40,000+" : "$94+" },
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
          <div className="space-y-4">
            <p className="rounded-xl border border-gold/20 bg-gold/5 p-4 text-sm text-cream/75">
              Your VIP Pass purchase has already been applied to your account. This {priceLabel}
              charge covers the Platinum Pass upgrade only.
            </p>
            <CheckoutEmbedZone
              ctaText={`Complete My Platinum Pass Order — ${priceLabel}`}
              checkoutUrl={checkoutUrl}
              microcopy="All Platinum Pass materials will be delivered instantly to the email you registered with."
              onProceed={handleProceed}
            />
          </div>
        </Reveal>
      </div>
    </main>
  );
}
