// /home/obed/Documents/free-webinar-sales/frontend/src/pages/PlatinumThankYouPage.tsx

import { motion } from "framer-motion";

import ConfirmationBox from "../components/ConfirmationBox";
import PlaceholderImage from "../components/PlaceholderImage";
import Reveal from "../components/Reveal";
import { config } from "../config";

const STEPS = [
  {
    title: "Check Your Email",
    body: `Open every email from ${config.supportEmail}. Mark us as a safe sender so nothing lands in spam. Your Zoom link is there. Do not lose it.`,
  },
  {
    title: "Complete the Pre-Masterclass Quick-Start Kit",
    body: "Set aside 30–45 minutes before the masterclass. Map your niche, draft your core offer, and identify your first three ideal clients. Walk in with work already done.",
  },
  {
    title: "Download and Print the 90-Day Launch Workbook",
    body: "Open the workbook before the masterclass. You'll fill it in live as we go. Prefer digital? Keep it open on a second screen or tablet.",
  },
  {
    title: "Review the Done-For-You Templates",
    body: "Skim the proposal template, pricing framework, and discovery call script. You don't need to memorize them — just know what they are so you can follow along.",
  },
  {
    title: "Write Down Your Top 3 Questions",
    body: "Platinum holders have priority Q&A access. Come with specific questions about your situation, niche, offer, or target clients.",
  },
  {
    title: "Show Up 5 Minutes Early",
    body: "The Platinum-only HOT SEAT session runs during the Zoom class. Come on camera and ask Eno live. The masterclass starts on time. Doors open 5 minutes early.",
  },
];

const SHARE = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/enoeka-businessanalysis-coach-businessanalyst-businessanalysiscoach-cbap-prosci-ccba-ecba-career" },
  { label: "Facebook", href: "https://www.facebook.com/businessanalysisschool/" },
 {
  label: "WhatsApp",
  href: "https://wa.me/2349139584561?text=Making%20Enquiry%20for%20this%20webinar"
},
{
  label: "Email",
  href: "mailto:support@businessanalysisschool.com?subject=Free%20Masterclass&body=Making%20Enquiry%20for%20this%20webinar"
},

];

export default function PlatinumThankYouPage() {
  const shareUrl = encodeURIComponent(window.location.origin);

  return (
    <main className="container-tight py-14">
      <Reveal>
        <div className="text-center">
          <span className="eyebrow">You Are All Set — Here Is Everything You Need to Know</span>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <h1 className="mx-auto mt-6 max-w-4xl text-center text-3xl font-semibold leading-tight sm:text-4xl">
          Welcome to the <span className="text-gold-gradient">Platinum Experience</span>.
          You Just Made the Best Pre-Work Investment of Your Consulting Career.
        </h1>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mx-auto mt-8 max-w-2xl">
          <ConfirmationBox title="Your Platinum Pass Is Confirmed">
            <p>Check your inbox right now. You should have received:</p>
            <ul className="mt-3 space-y-1.5 text-cream/75">
              <li>• Your masterclass confirmation with Zoom link and calendar invite</li>
              <li>• Your VIP Pass materials: the 90-Day Launch Workbook</li>
              <li>
                • Your Platinum materials: the Pre-Masterclass Quick-Start Kit and
                Consulting Templates
              </li>
            </ul>
            <p className="mt-3">
              Didn't receive everything? Email {config.supportEmail} and we'll resend.
            </p>
          </ConfirmationBox>
        </div>
      </Reveal>

      {/* Action plan */}
      <section className="mt-14">
        <Reveal>
          <h2 className="text-center text-3xl font-semibold">
            Your Exact Action Plan{" "}
            <span className="text-gold-gradient">Before the Masterclass</span>
          </h2>
        </Reveal>
        <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-2">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.06}>
              <div className="card flex h-full gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15 font-display text-lg font-bold text-gold-light">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-cream">{step.title}</h3>
                  <p className="mt-1 text-sm text-cream/70">{step.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Personal close */}
      <section className="mt-16">
        <Reveal>
          <div className="grid gap-8 rounded-3xl border border-gold/20 bg-ink-800/60 p-6 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <PlaceholderImage
              src="CEO.jpg"
              alt="Eno Eka"
              label="Eno — closing portrait"
              aspect="1/1"
              float
            />
            <div className="space-y-4 text-lg leading-relaxed text-cream/80">
              <p className="font-display text-2xl text-cream">
                I want to say something directly to you before I let you go.
              </p>
              <p>
                You did not just register for a free webinar and click off. You invested
                in your preparation. You took the extra step. That tells me something about
                who you are and how serious you are about building something real.
              </p>
              <p>
                I built ENY Consulting Inc. and Business Analysis School from nothing. No
                shortcuts. No inherited advantages. Just strategy, discipline, and a
                relentless commitment to doing the work.
              </p>
              <p>
                You already have the expertise. I am going to show you the system to
                monetize it. Let nothing stop you from attending this class.
              </p>
              <p className="font-semibold text-gold-light">See you on the inside.</p>
              <p className="text-sm text-cream/60">
                With respect and intention,
                <br />
                <span className="font-display text-lg text-cream">Eno Eka</span> · CEO, ENY
                Consulting Inc. · Founder, Business Analysis School · {config.brand.social}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Social share [GHL EMBED ZONE — SOCIAL SHARE BUTTONS] */}
      <section className="mt-14 text-center">
        <Reveal>
          <h3 className="text-xl font-semibold">
            Know someone who needs to hear this?
          </h3>
          <p className="mx-auto mt-2 max-w-lg text-cream/70">
            Share the free masterclass with a colleague who is ready to stop trading time
            for a paycheck.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {SHARE.map((s) => (
              <motion.a
                key={s.label}
                href={`${s.href}${shareUrl}`}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -3 }}
                className="btn-ghost"
              >
                {s.label}
              </motion.a>
            ))}
          </div>
        </Reveal>
      </section>
    </main>
  );
}
