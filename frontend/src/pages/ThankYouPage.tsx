// /home/obed/Documents/free-webinar-sales/frontend/src/pages/ThankYouPage.tsx

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ConfirmationBox from "../components/ConfirmationBox";
import PlaceholderImage from "../components/PlaceholderImage";
import Reveal from "../components/Reveal";
import { config } from "../config";
import { useCurrency } from "../context/CurrencyContext";

export default function ThankYouPage() {
  const navigate = useNavigate();
  const firstName = sessionStorage.getItem("lead_first_name") ?? "";
  const zoomUrl = sessionStorage.getItem("zoom_url") ?? config.zoomRegistrationUrl;
  const { currency } = useCurrency();
  const [calendarUrl, setCalendarUrl] = useState("");
  const vipPriceLabel = currency === "NGN" ? "₦10,000" : "$27";

  useEffect(() => {
    let cancelled = false;

    async function loadConfig() {
      try {
        const res = await fetch(`${config.apiBase}/api/config`);
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) {
          setCalendarUrl(data.ghl_calendar_url ?? "");
        }
      } catch {
        // Keep the button hidden if the config endpoint is unavailable.
      }
    }

    void loadConfig();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="container-narrow py-14">
      {/* Eyebrow warning */}
      <Reveal>
        <div className="text-center">
          <span className="eyebrow border-red-400/40 bg-red-400/10 text-red-200">
            ⚠ Wait — Don't Close This Page
          </span>
          <p className="mt-3 text-sm font-semibold uppercase tracking-widest text-cream/60">
            You Are Registered — One Important Step Before You Go
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <h1 className="mt-6 text-center text-3xl font-semibold leading-tight sm:text-4xl">
          {firstName ? `${firstName}, you're in. ` : "You're In. "}
          Now Let's Make Sure You Get{" "}
          <span className="text-gold-gradient">Every Possible Advantage</span> Before the
          Masterclass.
        </h1>
      </Reveal>

      {/* Confirmation */}
      <Reveal delay={0.15}>
        <div className="mt-8">
          <ConfirmationBox title="Your Registration Is Confirmed">
            <p>
              <strong>Event:</strong> How I Went From Accountant to Building a
              Multi-Million Dollar Global Consulting and Education Company
              <br />
              <strong>Format:</strong> Live on Zoom · <strong>Host:</strong> Eno Eka, CEO
              of ENY Consulting Inc.
            </p>
            <p className="mt-3">
              Check your inbox now. Your Zoom link and calendar invite are on their way.
              If you don't see it in 5 minutes, check spam and mark us as a safe sender.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={zoomUrl} target="_blank" rel="noreferrer" className="btn-cta text-sm">
                Confirm My Zoom Registration
              </a>
              {calendarUrl ? (
                <a
                  href={calendarUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost text-sm"
                >
                  + Add to Calendar
                </a>
              ) : null}
            </div>
          </ConfirmationBox>
        </div>
      </Reveal>

      {/* Transition copy */}
      <Reveal delay={0.2}>
        <div className="mt-12 space-y-4 text-lg leading-relaxed text-cream/75">
          <p className="font-display text-2xl text-cream">Good. You are registered.</p>
          <p>Now I want to be straight with you.</p>
          <p>
            Most people register for a free masterclass and show up unprepared. They take
            a few notes, feel inspired for a day, and then go back to exactly what they
            were doing before. I do not want that for you.
          </p>
          <p>
            The professionals who get the most out of this masterclass arrive with clarity
            on where they are, what they want to build, and what is blocking them. They
            follow a structured workbook. They leave with a concrete 90-day plan, not just
            motivation. That is exactly what the VIP Pass gives you.
          </p>
        </div>
      </Reveal>

      {/* ---------- ONE-TIME OFFER ---------- */}
      <Reveal delay={0.1}>
        <div className="mt-12 overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-b from-gold/10 to-transparent p-1">
          <div className="rounded-[1.4rem] bg-ink-800/80 p-6 sm:p-9">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
              <div className="flex-1">
                <span className="eyebrow">One-Time Offer — This Page Only</span>
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-light">
                    {currency === "NGN" ? "Pricing for Nigeria" : "Pricing for International Visitors"}
                  </span>
                </div>
                <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
                  Upgrade to the VIP Pass for{" "}
                  <span className="text-gold-gradient">{vipPriceLabel}</span> and Show Up Ready to
                  Launch
                </h2>
                <p className="mt-4 text-cream/75">
                  This is not a recording you can find on YouTube. It's a hand-built
                  resource package designed specifically to complement this masterclass
                  and give you a head start.
                </p>

                <div className="mt-6 rounded-2xl border border-white/10 bg-ink/40 p-5">
                  <p className="text-sm font-semibold uppercase tracking-widest text-gold-light">
                    When You Add the VIP Pass Today, You Get:
                  </p>
                  <div className="mt-3 flex items-start gap-3">
                    <Check />
                    <p className="text-cream/85">
                      <strong>The 90-Day Consulting Launch Workbook</strong> — a fillable,
                      structured workbook that walks alongside the masterclass. Document
                      your niche, your offer, your pricing, and your first 90-day action
                      plan. This is the difference between watching and doing.
                    </p>
                  </div>
                </div>

                <p className="mt-5 rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-sm text-cream/70">
                  ⏳ This offer disappears when you leave this page. It will not appear in
                  your confirmation email. It will not be available at the masterclass at
                  this price. One-time offer for registered attendees only.
                </p>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/vip-checkout")}
                  className="btn-cta mt-6 w-full sm:w-auto"
                >
                  Yes, Add the VIP Pass for {vipPriceLabel}
                </motion.button>
                <p className="mt-2 text-xs text-cream/50">
                  Secure checkout. Takes less than 60 seconds.
                </p>

                <button
                  onClick={() => navigate("/vip-confirmed")}
                  className="mt-5 block text-sm text-cream/45 underline underline-offset-4 hover:text-cream/70"
                >
                  No thank you. I'll attend the masterclass without the VIP Pass and skip
                  the workbook.
                </button>
              </div>

              <div className="w-full lg:w-72">
                <PlaceholderImage
                  src="CEO.jpg"
                  alt="90-Day Consulting Launch Workbook"
                  label="VIP Workbook mockup"
                  aspect="3/4"
                  float
                />
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <p className="mt-8 text-center text-xs text-cream/45">
        🔒 Secured by Stripe. 100% safe checkout. Questions? {config.supportEmail}
      </p>
    </main>
  );
}

function Check() {
  return (
    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-light">
      ✓
    </span>
  );
}
