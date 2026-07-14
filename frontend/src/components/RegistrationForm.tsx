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
  city: string;
  country: string;
  industry: string;
  job_title: string;
  questions_comments: string;
}

const EMPTY: FormState = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  city: "",
  country: "",
  industry: "",
  job_title: "",
  questions_comments: "",
};

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

  const update = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmed = {
      first_name: form.first_name.trim(),
      last_name: form.last_name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      city: form.city.trim(),
      country: form.country.trim(),
      industry: form.industry.trim(),
      job_title: form.job_title.trim(),
      questions_comments: form.questions_comments.trim(),
    };

    if (!trimmed.first_name || !trimmed.last_name || !trimmed.email || !trimmed.city || !trimmed.country || !trimmed.industry || !trimmed.job_title || !trimmed.questions_comments) {
      setStatus("error");
      setError("Please complete every required field so we can send your Zoom registration details.");
      return;
    }

    setForm(trimmed as FormState);
    setStatus("loading");
    setError("");
    try {
      const res = await createLead({ ...trimmed, source: "opt-in-page" });
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
          aria-required="true"
          autoComplete="given-name"
        />
        <input
          className={inputCls}
          placeholder="Last name"
          value={form.last_name}
          onChange={update("last_name")}
          required
          aria-required="true"
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
        aria-required="true"
        autoComplete="email"
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          className={inputCls}
          placeholder="City"
          value={form.city}
          onChange={update("city")}
          required
          aria-required="true"
        />
        <input
          className={inputCls}
          placeholder="Country/Region"
          value={form.country}
          onChange={update("country")}
          required
          aria-required="true"
        />
      </div>
      <input
        className={inputCls}
        type="tel"
        placeholder="Phone number"
        value={form.phone}
        onChange={update("phone")}
        required
        aria-required="true"
        autoComplete="tel"
      />
      <select
        className={inputCls}
        value={form.industry}
        onChange={update("industry")}
        required
        aria-required="true"
      >
        <option value="">Select an industry</option>
        <option value="Accounting">Accounting</option>
        <option value="Advertising/Marketing/PR">Advertising/Marketing/PR</option>
        <option value="Aerospace & Defense">Aerospace & Defense</option>
        <option value="Agriculture">Agriculture</option>
        <option value="Banking & Securities">Banking & Securities</option>
        <option value="Call Center Outsourcing">Call Center Outsourcing</option>
        <option value="Consulting">Consulting</option>
        <option value="Consumer Products">Consumer Products</option>
        <option value="Education">Education</option>
        <option value="Energy, Chemical, Utilities">Energy, Chemical, Utilities</option>
        <option value="Financial Services - Other">Financial Services - Other</option>
        <option value="Government - Federal">Government - Federal</option>
        <option value="Government - State & Local">Government - State & Local</option>
        <option value="High Tech - Hardware">High Tech - Hardware</option>
        <option value="High Tech - ISP">High Tech - ISP</option>
        <option value="High Tech - Other">High Tech - Other</option>
        <option value="Hospital, Clinic, Doctor Office">Hospital, Clinic, Doctor Office</option>
        <option value="Hospitality, Travel, Tourism">Hospitality, Travel, Tourism</option>
        <option value="Insurance">Insurance</option>
        <option value="Legal">Legal</option>
        <option value="Manufacturing">Manufacturing</option>
        <option value="Medical, Pharma, Biotech">Medical, Pharma, Biotech</option>
        <option value="Real Estate">Real Estate</option>
        <option value="Retail">Retail</option>
        <option value="Software - Finance">Software - Finance</option>
        <option value="Software - Healthcare">Software - Healthcare</option>
        <option value="Software - Other">Software - Other</option>
        <option value="Support Outsourcing">Support Outsourcing</option>
        <option value="Telecommunications">Telecommunications</option>
        <option value="Transportation & Distribution">Transportation & Distribution</option>
        <option value="VAR/Systems Integrator">VAR/Systems Integrator</option>
        <option value="Other">Other</option>
      </select>
      <input
        className={inputCls}
        placeholder="Job title"
        value={form.job_title}
        onChange={update("job_title")}
        required
        aria-required="true"
      />
      <textarea
        className={`${inputCls} min-h-28 resize-y`}
        placeholder="Questions & comments"
        value={form.questions_comments}
        onChange={update("questions_comments")}
        required
        aria-required="true"
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
