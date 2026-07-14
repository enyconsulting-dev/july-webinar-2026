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

const COUNTRY_OPTIONS = [
  { value: "AF", label: "Afghanistan" },
  { value: "AL", label: "Albania" },
  { value: "DZ", label: "Algeria" },
  { value: "AS", label: "American Samoa" },
  { value: "AD", label: "Andorra" },
  { value: "AO", label: "Angola" },
  { value: "AI", label: "Anguilla" },
  { value: "AQ", label: "Antarctica" },
  { value: "AG", label: "Antigua and Barbuda" },
  { value: "AR", label: "Argentina" },
  { value: "AM", label: "Armenia" },
  { value: "AW", label: "Aruba" },
  { value: "AU", label: "Australia" },
  { value: "AT", label: "Austria" },
  { value: "AZ", label: "Azerbaijan" },
  { value: "BS", label: "Bahamas" },
  { value: "BH", label: "Bahrain" },
  { value: "BD", label: "Bangladesh" },
  { value: "BB", label: "Barbados" },
  { value: "BY", label: "Belarus" },
  { value: "BE", label: "Belgium" },
  { value: "BZ", label: "Belize" },
  { value: "BJ", label: "Benin" },
  { value: "BM", label: "Bermuda" },
  { value: "BT", label: "Bhutan" },
  { value: "BO", label: "Bolivia" },
  { value: "BA", label: "Bosnia and Herzegovina" },
  { value: "BW", label: "Botswana" },
  { value: "BV", label: "Bouvet Island" },
  { value: "BR", label: "Brazil" },
  { value: "IO", label: "British Indian Ocean Territory" },
  { value: "BN", label: "Brunei Darussalam" },
  { value: "BG", label: "Bulgaria" },
  { value: "BF", label: "Burkina Faso" },
  { value: "BI", label: "Burundi" },
  { value: "KH", label: "Cambodia" },
  { value: "CM", label: "Cameroon" },
  { value: "CA", label: "Canada" },
  { value: "CV", label: "Cape Verde" },
  { value: "KY", label: "Cayman Islands" },
  { value: "CF", label: "Central African Republic" },
  { value: "TD", label: "Chad" },
  { value: "CL", label: "Chile" },
  { value: "CN", label: "China" },
  { value: "CX", label: "Christmas Island" },
  { value: "CC", label: "Cocos (Keeling) Islands" },
  { value: "CO", label: "Colombia" },
  { value: "KM", label: "Comoros" },
  { value: "CG", label: "Congo" },
  { value: "CD", label: "Congo, Democratic Republic" },
  { value: "CK", label: "Cook Islands" },
  { value: "CR", label: "Costa Rica" },
  { value: "CI", label: "Côte d'Ivoire" },
  { value: "HR", label: "Croatia" },
  { value: "CU", label: "Cuba" },
  { value: "CY", label: "Cyprus" },
  { value: "CZ", label: "Czech Republic" },
  { value: "DK", label: "Denmark" },
  { value: "DJ", label: "Djibouti" },
  { value: "DM", label: "Dominica" },
  { value: "DO", label: "Dominican Republic" },
  { value: "EC", label: "Ecuador" },
  { value: "EG", label: "Egypt" },
  { value: "SV", label: "El Salvador" },
  { value: "GQ", label: "Equatorial Guinea" },
  { value: "ER", label: "Eritrea" },
  { value: "EE", label: "Estonia" },
  { value: "ET", label: "Ethiopia" },
  { value: "FK", label: "Falkland Islands" },
  { value: "FO", label: "Faroe Islands" },
  { value: "FJ", label: "Fiji" },
  { value: "FI", label: "Finland" },
  { value: "FR", label: "France" },
  { value: "GF", label: "French Guiana" },
  { value: "PF", label: "French Polynesia" },
  { value: "TF", label: "French Southern Territories" },
  { value: "GA", label: "Gabon" },
  { value: "GM", label: "Gambia" },
  { value: "GE", label: "Georgia" },
  { value: "DE", label: "Germany" },
  { value: "GH", label: "Ghana" },
  { value: "GI", label: "Gibraltar" },
  { value: "GR", label: "Greece" },
  { value: "GL", label: "Greenland" },
  { value: "GD", label: "Grenada" },
  { value: "GP", label: "Guadeloupe" },
  { value: "GU", label: "Guam" },
  { value: "GT", label: "Guatemala" },
  { value: "GG", label: "Guernsey" },
  { value: "GN", label: "Guinea" },
  { value: "GW", label: "Guinea-Bissau" },
  { value: "GY", label: "Guyana" },
  { value: "HT", label: "Haiti" },
  { value: "HM", label: "Heard Island and McDonald Islands" },
  { value: "VA", label: "Holy See (Vatican City State)" },
  { value: "HN", label: "Honduras" },
  { value: "HK", label: "Hong Kong" },
  { value: "HU", label: "Hungary" },
  { value: "IS", label: "Iceland" },
  { value: "IN", label: "India" },
  { value: "ID", label: "Indonesia" },
  { value: "IR", label: "Iran" },
  { value: "IQ", label: "Iraq" },
  { value: "IE", label: "Ireland" },
  { value: "IM", label: "Isle of Man" },
  { value: "IL", label: "Israel" },
  { value: "IT", label: "Italy" },
  { value: "JM", label: "Jamaica" },
  { value: "JP", label: "Japan" },
  { value: "JE", label: "Jersey" },
  { value: "JO", label: "Jordan" },
  { value: "KZ", label: "Kazakhstan" },
  { value: "KE", label: "Kenya" },
  { value: "KI", label: "Kiribati" },
  { value: "KP", label: "North Korea" },
  { value: "KR", label: "South Korea" },
  { value: "KW", label: "Kuwait" },
  { value: "KG", label: "Kyrgyzstan" },
  { value: "LA", label: "Laos" },
  { value: "LV", label: "Latvia" },
  { value: "LB", label: "Lebanon" },
  { value: "LS", label: "Lesotho" },
  { value: "LR", label: "Liberia" },
  { value: "LY", label: "Libya" },
  { value: "LI", label: "Liechtenstein" },
  { value: "LT", label: "Lithuania" },
  { value: "LU", label: "Luxembourg" },
  { value: "MO", label: "Macao" },
  { value: "MG", label: "Madagascar" },
  { value: "MW", label: "Malawi" },
  { value: "MY", label: "Malaysia" },
  { value: "MV", label: "Maldives" },
  { value: "ML", label: "Mali" },
  { value: "MT", label: "Malta" },
  { value: "MH", label: "Marshall Islands" },
  { value: "MQ", label: "Martinique" },
  { value: "MR", label: "Mauritania" },
  { value: "MU", label: "Mauritius" },
  { value: "YT", label: "Mayotte" },
  { value: "MX", label: "Mexico" },
  { value: "FM", label: "Micronesia" },
  { value: "MD", label: "Moldova" },
  { value: "MC", label: "Monaco" },
  { value: "MN", label: "Mongolia" },
  { value: "ME", label: "Montenegro" },
  { value: "MS", label: "Montserrat" },
  { value: "MA", label: "Morocco" },
  { value: "MZ", label: "Mozambique" },
  { value: "MM", label: "Myanmar" },
  { value: "NA", label: "Namibia" },
  { value: "NR", label: "Nauru" },
  { value: "NP", label: "Nepal" },
  { value: "NL", label: "Netherlands" },
  { value: "NC", label: "New Caledonia" },
  { value: "NZ", label: "New Zealand" },
  { value: "NI", label: "Nicaragua" },
  { value: "NE", label: "Niger" },
  { value: "NG", label: "Nigeria" },
  { value: "NU", label: "Niue" },
  { value: "NF", label: "Norfolk Island" },
  { value: "MK", label: "North Macedonia" },
  { value: "MP", label: "Northern Mariana Islands" },
  { value: "NO", label: "Norway" },
  { value: "OM", label: "Oman" },
  { value: "PK", label: "Pakistan" },
  { value: "PW", label: "Palau" },
  { value: "PS", label: "Palestine" },
  { value: "PA", label: "Panama" },
  { value: "PG", label: "Papua New Guinea" },
  { value: "PY", label: "Paraguay" },
  { value: "PE", label: "Peru" },
  { value: "PH", label: "Philippines" },
  { value: "PN", label: "Pitcairn" },
  { value: "PL", label: "Poland" },
  { value: "PT", label: "Portugal" },
  { value: "PR", label: "Puerto Rico" },
  { value: "QA", label: "Qatar" },
  { value: "RE", label: "Réunion" },
  { value: "RO", label: "Romania" },
  { value: "RU", label: "Russia" },
  { value: "RW", label: "Rwanda" },
  { value: "BL", label: "Saint Barthélemy" },
  { value: "SH", label: "Saint Helena" },
  { value: "KN", label: "Saint Kitts and Nevis" },
  { value: "LC", label: "Saint Lucia" },
  { value: "MF", label: "Saint Martin" },
  { value: "PM", label: "Saint Pierre and Miquelon" },
  { value: "VC", label: "Saint Vincent and the Grenadines" },
  { value: "WS", label: "Samoa" },
  { value: "SM", label: "San Marino" },
  { value: "ST", label: "Sao Tome and Principe" },
  { value: "SA", label: "Saudi Arabia" },
  { value: "SN", label: "Senegal" },
  { value: "RS", label: "Serbia" },
  { value: "SC", label: "Seychelles" },
  { value: "SL", label: "Sierra Leone" },
  { value: "SG", label: "Singapore" },
  { value: "SK", label: "Slovakia" },
  { value: "SI", label: "Slovenia" },
  { value: "SB", label: "Solomon Islands" },
  { value: "SO", label: "Somalia" },
  { value: "ZA", label: "South Africa" },
  { value: "GS", label: "South Georgia and the South Sandwich Islands" },
  { value: "SS", label: "South Sudan" },
  { value: "ES", label: "Spain" },
  { value: "LK", label: "Sri Lanka" },
  { value: "SD", label: "Sudan" },
  { value: "SR", label: "Suriname" },
  { value: "SJ", label: "Svalbard and Jan Mayen" },
  { value: "SZ", label: "Eswatini" },
  { value: "SE", label: "Sweden" },
  { value: "CH", label: "Switzerland" },
  { value: "SY", label: "Syria" },
  { value: "TW", label: "Taiwan" },
  { value: "TJ", label: "Tajikistan" },
  { value: "TZ", label: "Tanzania" },
  { value: "TH", label: "Thailand" },
  { value: "TL", label: "Timor-Leste" },
  { value: "TG", label: "Togo" },
  { value: "TK", label: "Tokelau" },
  { value: "TO", label: "Tonga" },
  { value: "TT", label: "Trinidad and Tobago" },
  { value: "TN", label: "Tunisia" },
  { value: "TR", label: "Turkey" },
  { value: "TM", label: "Turkmenistan" },
  { value: "TC", label: "Turks and Caicos Islands" },
  { value: "TV", label: "Tuvalu" },
  { value: "UG", label: "Uganda" },
  { value: "UA", label: "Ukraine" },
  { value: "AE", label: "United Arab Emirates" },
  { value: "GB", label: "United Kingdom" },
  { value: "US", label: "United States" },
  { value: "UM", label: "United States Minor Outlying Islands" },
  { value: "UY", label: "Uruguay" },
  { value: "UZ", label: "Uzbekistan" },
  { value: "VU", label: "Vanuatu" },
  { value: "VE", label: "Venezuela" },
  { value: "VN", label: "Vietnam" },
  { value: "VG", label: "Virgin Islands, British" },
  { value: "VI", label: "Virgin Islands, U.S." },
  { value: "WF", label: "Wallis and Futuna" },
  { value: "EH", label: "Western Sahara" },
  { value: "YE", label: "Yemen" },
  { value: "ZM", label: "Zambia" },
  { value: "ZW", label: "Zimbabwe" },
];

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
        <select
          className={inputCls}
          value={form.country}
          onChange={update("country")}
          required
          aria-required="true"
        >
          <option value="">Select country</option>
          {COUNTRY_OPTIONS.map((country) => (
            <option key={country.value} value={country.value}>
              {country.label}
            </option>
          ))}
        </select>
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
