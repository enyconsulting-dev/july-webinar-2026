// /home/obed/Documents/free-webinar-sales/frontend/src/pages/VipThankYouPage.tsx

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import ConfirmationBox from "../components/ConfirmationBox";
import PlaceholderImage from "../components/PlaceholderImage";
import Reveal from "../components/Reveal";
import { config } from "../config";
import { useCurrency } from "../context/CurrencyContext";

const PLATINUM_INCLUDES = [
  {
    title: "Everything in Your VIP Pass",
    body: "The 90-Day Launch Workbook you already unlocked.",
  },
  {
    title: "Pre-Masterclass Quick-Start Kit",
    body: "A focused pre-work guide delivered before the live session. Map your niche, clarify your offer, and identify your first three target clients before Eno says a single word.",
  },
  {
    title: "Done-For-You Consulting Templates",
    body: "Client proposal template, pricing menu framework, discovery call script, and a follow-up sequence. These took years to refine. You get them today.",
  },
  {
    title: "Platinum-Only Live Hot Seat Session",
    body: "A dedicated live session exclusive to Platinum holders. Come on camera and ask Eno a question live. Work through your specific situation.",
  },
  {
    title: "Priority Program Seat Reservation",
    body: "If you enroll in a paid program at the masterclass, Platinum holders receive priority placement. No waitlist. No scrambling.",
  },
];

const VALUE_STACK = [
  { item: "Everything in VIP Pass", value: "₦10,000 / $27" },
  { item: "Pre-Masterclass Quick-Start Kit", value: "₦25,000 / $67" },
  { item: "Done-For-You Consulting Templates", value: "Included" },
  { item: "Platinum-Only Live Working Session", value: "Included" },
  { item: "Priority Program Seat Reservation", value: "Included" },
];

export default function VipThankYouPage() {
  const navigate = useNavigate();
  const { currency } = useCurrency();
  const platinumPriceLabel = currency === "NGN" ? "₦25,000" : "$67";

  return (
    <main className="container-tight py-14">
      <Reveal>
        <div className="text-center">
          <span className="eyebrow">
            VIP Pass Confirmed — You Have One More Decision to Make
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <h1 className="mx-auto mt-6 max-w-4xl text-center text-3xl font-semibold leading-tight sm:text-4xl">
          Your VIP Pass Is Confirmed. Now Here Is How to Arrive{" "}
          <span className="text-gold-gradient">Already Ahead of Everyone Else</span> in
          the Room.
        </h1>
      </Reveal>

      <Reveal delay={0.15}>
        <p className="mx-auto mt-4 max-w-2xl text-center text-cream/70">
          Most attendees will show up with a notepad and a hope. You are about to show up
          with a complete consulting launch toolkit. Here is your final upgrade
          opportunity.
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mx-auto mt-8 max-w-2xl">
          <ConfirmationBox title="Your VIP Pass Is Confirmed" />
        </div>
      </Reveal>

      {/* Transition */}
      <Reveal delay={0.1}>
        <div className="mx-auto mt-12 max-w-2xl space-y-4 text-lg leading-relaxed text-cream/75">
          <p className="font-display text-2xl text-cream">You made a smart decision.</p>
          <p>
            The professionals I have coached who move the fastest have two things in
            common. First, they understand the strategy. Second, they have the tools to
            execute it immediately after they learn it.
          </p>
          <p className="font-semibold text-gold-light">
            The VIP Pass gives you the strategy framework. The Platinum Pass gives you the
            execution toolkit.
          </p>
        </div>
      </Reveal>

      {/* Offer */}
      <Reveal delay={0.1}>
        <div className="mt-12 rounded-3xl border border-gold/30 bg-gradient-to-b from-gold/10 to-transparent p-1">
          <div className="rounded-[1.4rem] bg-ink-800/80 p-6 sm:p-9">
            <span className="eyebrow">One-Time Offer — This Page Only</span>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-light">
                {currency === "NGN" ? "Pricing for Nigeria" : "Pricing for International Visitors"}
              </span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
              Upgrade to the Platinum Pass for{" "}
              <span className="text-gold-gradient">{platinumPriceLabel}</span> and Walk In With Your
              Consulting Business Already Half-Built
            </h2>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              {/* Includes */}
              <div className="space-y-4">
                {PLATINUM_INCLUDES.map((inc, i) => (
                  <motion.div
                    key={inc.title}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-light">
                      ✓
                    </span>
                    <p className="text-cream/85">
                      <strong className="text-cream">{inc.title}</strong> — {inc.body}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Value stack */}
              <div>
                <div className="card">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold-light">
                    What You Get
                  </p>
                  <dl className="divide-y divide-white/10">
                    {VALUE_STACK.map((row) => (
                      <div key={row.item} className="flex justify-between gap-4 py-2.5">
                        <dt className="text-sm text-cream/70">{row.item}</dt>
                        <dd className="text-sm font-semibold text-cream">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-3 flex justify-between border-t border-white/10 pt-3">
                    <span className="text-sm text-cream/60">Total Value</span>
                    <span className="font-display text-xl font-bold text-cream/80 line-through decoration-red-400/60">
                      {currency === "NGN" ? "₦40,000+" : "$94+"}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between rounded-xl bg-gold/10 px-4 py-3">
                    <span className="text-sm font-semibold uppercase tracking-wide text-gold-light">
                      Your Price Today
                    </span>
                    <span className="font-display text-3xl font-bold text-gold-light">
                      {platinumPriceLabel}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <PlaceholderImage
                    src="enospeech.png"
                    alt="Platinum consulting toolkit"
                    label="Platinum toolkit mockup"
                    aspect="16/9"
                  />
                </div>
              </div>
            </div>

            {/* Scarcity */}
            <div className="mt-8 rounded-2xl border border-red-400/20 bg-red-400/5 p-5">
              <p className="font-semibold text-cream">Why {platinumPriceLabel} and why only here?</p>
              <p className="mt-2 text-sm text-cream/70">
                The Platinum Pass includes a live HOT SEAT session with a hard cap on
                attendees so Eno can give real, personalized attention. When those spots
                fill, this offer closes. There is a real ceiling on how many people she
                can work with in one session. You either take it now or you do not take it
                at all.
              </p>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/platinum-checkout")}
              className="btn-cta mt-8 w-full sm:w-auto"
            >
              Yes, Upgrade to the Platinum Pass — {platinumPriceLabel}
            </motion.button>
            <p className="mt-2 text-xs text-cream/50">
              Secure checkout. Completion takes less than 60 seconds.
            </p>

            <button
              onClick={() => navigate("/platinum-confirmed")}
              className="mt-5 block text-sm text-cream/45 underline underline-offset-4 hover:text-cream/70"
            >
              No thank you. I'll keep my VIP Pass as is and skip the templates, live hot
              seat session and priority seat.
            </button>
          </div>
        </div>
      </Reveal>

      <p className="mt-8 text-center text-xs text-cream/45">
        🔒 Secured by Stripe. Instant delivery. Questions? {config.supportEmail}
      </p>
    </main>
  );
}
