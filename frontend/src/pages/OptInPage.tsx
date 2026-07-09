// /home/obed/Documents/free-webinar-sales/frontend/src/pages/OptInPage.tsx

import { motion } from "framer-motion";

import Countdown from "../components/Countdown";
import PlaceholderImage from "../components/PlaceholderImage";
import RegistrationForm from "../components/RegistrationForm";
import Reveal from "../components/Reveal";
import TestimonialSlider from "../components/TestimonialSlider";
import TrustBar from "../components/TrustBar";

const LEARN = [
  {
    title: "The Consulting Launch Blueprint",
    body: "The step-by-step framework I used to go from employee to multi-million dollar business owner — and how you can compress that timeline into 90 days.",
  },
  {
    title: "Package Your Expertise Into an Offer People Pay For",
    body: "Stop giving away free advice. Position your skills as a premium consulting service with a price tag that reflects your real value.",
  },
  {
    title: "A Client Acquisition System — No Cold Calling, No Going Viral",
    body: "The exact strategy I used to land high-value clients consistently without a massive following or an ads budget.",
  },
  {
    title: "The #1 Mistake That Keeps Experienced Professionals Stuck",
    body: "Most people make this error before they even launch. We will fix it before you leave the call.",
  },
];

export default function OptInPage() {
  return (
    <main>
      {/* ---------- HERO ---------- */}
      <section className="container-tight pt-10 sm:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left: copy + form */}
          <div>
            <motion.span
              className="eyebrow"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              ● Free Live Masterclass — Limited Seats Available
            </motion.span>

            <motion.h1
              className="mt-5 text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-[3.4rem]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
            >
              How I Went From Accountant to Building a{" "}
              <span className="text-gold-gradient">Multi-Million Dollar</span> Global
              Consulting Company Serving 100,000+ Professionals
            </motion.h1>

            <motion.p
              className="mt-5 max-w-xl text-lg leading-relaxed text-cream/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Join me live and I'll show you the exact strategy to launch your own
              profitable consulting business in 90 days — even if you're starting from
              scratch, switching careers, or stuck trading time for a salary.
            </motion.p>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Countdown />
              <span className="text-sm text-cream/50">until doors open</span>
            </div>

            {/* Registration card */}
            <motion.div
              id="register"
              className="card mt-8 max-w-xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <p className="mb-4 text-center text-sm font-semibold uppercase tracking-widest text-gold-light">
                Secure Your Free Seat Now
              </p>
              <RegistrationForm />
            </motion.div>
          </div>

          {/* Right: founder portrait placeholder */}
          <div className="relative">
            <PlaceholderImage
              src="AI_Eno_Pic.png"
              alt="Eno Eka, Founder of ENY Consulting Inc."
              label="Eno Eka — hero portrait"
              aspect="4/5"
              float
            />
            {/* Floating stat chips */}
            <motion.div
              className="absolute -left-4 top-10 rounded-xl border border-gold/30 bg-ink-800/90 px-4 py-3 shadow-gold"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <p className="font-display text-2xl font-bold text-gold-light">100,000+</p>
              <p className="text-[11px] uppercase tracking-wide text-cream/50">
                Professionals Trained
              </p>
            </motion.div>
            <motion.div
              className="absolute -right-2 bottom-12 rounded-xl border border-gold/30 bg-ink-800/90 px-4 py-3 shadow-gold"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <p className="font-display text-2xl font-bold text-gold-light">90+</p>
              <p className="text-[11px] uppercase tracking-wide text-cream/50">
                Countries Reached
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------- PROMISE BAR ---------- */}
      <section className="mt-16 border-y border-white/10 bg-ink-800/40 py-5">
        <div className="container-tight flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-sm font-semibold uppercase tracking-wide text-cream/80">
          <span>Free</span>
          <Dot />
          <span>Live</span>
          <Dot />
          <span>90 Minutes</span>
          <Dot />
          <span>Real Strategy</span>
          <Dot />
          <span className="text-gold-light">No Fluff</span>
        </div>
        <p className="container-tight mt-2 text-center text-xs text-cream/50">
          Hosted by Eno Eka — Forbes Featured Consultant, Canada's Top 100 Most Powerful
          Women, and Founder of Business Analysis School
        </p>
      </section>

      {/* ---------- STORY ---------- */}
      <section className="container-tight py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <PlaceholderImage
              src="/images/eno-story.jpg"
              alt="Eno Eka speaking on stage"
              label="Story / stage image"
              aspect="1/1"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-4 text-lg leading-relaxed text-cream/75">
              <p className="font-display text-2xl text-cream">You are good at what you do.</p>
              <p>
                You have the credentials. The experience. The results. But right now,
                someone else is profiting from your expertise while you collect a paycheck
                that does not match your value. <strong className="text-cream">That stops here.</strong>
              </p>
              <p>
                I was an accountant in Nigeria with no roadmap and no connections in North
                America. No trust fund. No network. I had a skill set, a strategy, and an
                obsession with building something real.
              </p>
              <p>
                Today, ENY Consulting Inc. operates across Canada, the USA, and Nigeria.
                Business Analysis School has trained over 100,000 professionals in more
                than 90 countries. I have led a $6 billion core banking digital
                transformation and one of the largest credit union mergers in Canadian
                history.
              </p>
              <p className="font-semibold text-gold-light">
                None of that happened by accident. It happened because of a repeatable
                system. I am going to hand that system to you on this masterclass.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- WHAT YOU'LL LEARN ---------- */}
      <section className="container-tight pb-20">
        <Reveal>
          <h2 className="text-center text-3xl font-semibold sm:text-4xl">
            Here Is Exactly <span className="text-gold-gradient">What You Will Learn</span>
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {LEARN.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="card h-full transition-colors hover:border-gold/40">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 font-display text-lg font-bold text-gold-light">
                  {i + 1}
                </div>
                <h3 className="text-xl font-semibold text-cream">{item.title}</h3>
                <p className="mt-2 text-cream/70">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- SOCIAL PROOF SLIDER ---------- */}
      <section className="container-narrow pb-20">
        <Reveal>
          <TestimonialSlider />
        </Reveal>
      </section>

      {/* ---------- TRUST ---------- */}
      <section className="container-tight pb-20">
        <Reveal>
          <TrustBar />
        </Reveal>
      </section>

      {/* ---------- FINAL CTA ---------- */}
      <section className="container-narrow pb-24">
        <Reveal>
          <div className="card text-center">
            <h2 className="text-3xl font-semibold">Save Your Free Seat</h2>
            <p className="mx-auto mt-3 max-w-md text-cream/70">
              Seats are limited and this masterclass is live. Register now and get your
              instant confirmation with the Zoom link.
            </p>
            <a href="#register" className="btn-cta mt-6">
              Yes, Save My Free Seat
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

function Dot() {
  return <span className="text-gold/50">◆</span>;
}
