// /home/obed/Documents/free-webinar-sales/frontend/src/components/RegistrationForm.tsx

import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createLead } from "../api";

interface FormState {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

const EMPTY: FormState = { first_name: "", last_name: "", email: "", phone: "" };

/**
 * Custom-designed opt-in form. Posts to the FastAPI backend (which forwards to
 * GoHighLevel), stores the registrant email locally for the upsell flow, then
 * routes to the Thank You page.
 */
export default function RegistrationForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string>("");

  const update = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await createLead({ ...form, source: "opt-in-page" });
      // Persist for the VIP/Platinum upsell steps.
      sessionStorage.setItem("lead_email", res.email);
      sessionStorage.setItem("lead_first_name", res.first_name);
      sessionStorage.setItem("zoom_url", res.zoom_registration_url);
      navigate("/thank-you");
    } catch (err) {
      setStatus("error");
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong.";
      setError(
        message.includes("Registration service is temporarily unavailable")
          ? "We’re having trouble saving seats right now. Please try again in a few minutes."
          : "We couldn't save your seat just now. Please try again."
      );
    }
  }

  const inputCls =
    "w-full rounded-xl border border-white/15 bg-ink/60 px-4 py-3 text-cream placeholder:text-cream/40 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30";

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          className={inputCls}
          placeholder="First name"
          value={form.first_name}
          onChange={update("first_name")}
          required
          autoComplete="given-name"
        />
        <input
          className={inputCls}
          placeholder="Last name"
          value={form.last_name}
          onChange={update("last_name")}
          required
          autoComplete="family-name"
        />
      </div>
      <input
        className={inputCls}
        type="email"
        placeholder="Email address"
        value={form.email}
        onChange={update("email")}
        required
        autoComplete="email"
      />
      <input
        className={inputCls}
        type="tel"
        placeholder="Phone number"
        value={form.phone}
        onChange={update("phone")}
        autoComplete="tel"
      />

      {status === "error" && (
        <p className="text-sm text-red-300" role="alert">
          {error}
        </p>
      )}

      <motion.button
        type="submit"
        disabled={status === "loading"}
        whileTap={{ scale: 0.97 }}
        className="btn-cta w-full disabled:opacity-70"
      >
        {status === "loading" ? "Saving your seat…" : "Yes, Save My Free Seat"}
      </motion.button>

      <p className="pt-1 text-center text-xs leading-relaxed text-cream/50">
        You will receive an instant confirmation email with your Zoom link, session time,
        and a calendar invite. This masterclass is live. Seats are limited.
      </p>
    </form>
  );
}
