// /home/obed/Documents/free-webinar-sales/frontend/src/config.ts

// Central config. Values that vary per environment come from Vite env vars
// (prefixed VITE_). Placeholder checkout links live here until GHL/Stripe
// checkout URLs are available.

export const config = {
  apiBase:
    import.meta.env.VITE_API_BASE ??
    (import.meta.env.PROD
      ? "https://july-webinar-2026.onrender.com"
      : ""), // "" => same-origin (dev proxy)

  zoomRegistrationUrl:
    import.meta.env.VITE_ZOOM_URL ??
    "https://us06web.zoom.us/meeting/register/kZIx9YQbSBi-GbYHGHCBrg",

  vipCheckoutUrl: {
    NGN: import.meta.env.VITE_VIP_CHECKOUT_URL_NGN ?? "#vip-checkout-placeholder-ngn",
    USD: import.meta.env.VITE_VIP_CHECKOUT_URL_USD ?? "#vip-checkout-placeholder-usd",
  },
  platinumCheckoutUrl: {
    NGN: import.meta.env.VITE_PLATINUM_CHECKOUT_URL_NGN ?? "#platinum-checkout-placeholder-ngn",
    USD: import.meta.env.VITE_PLATINUM_CHECKOUT_URL_USD ?? "#platinum-checkout-placeholder-usd",
  },

  supportEmail: "support@businessanalysisschool.com",

  event: {
    host: "Eno Eka",
    title:
      "How I Went From Accountant to Building a Multi-Million Dollar Global Consulting Company",
    // Set a real date/time to power the countdown. ISO 8601.
    // Placeholder: 7 days from load handled in Countdown when this is null.
    startsAt: import.meta.env.VITE_EVENT_STARTS_AT ?? null,
  },

  brand: {
    company: "ENY Consulting Inc.",
    school: "Business Analysis School",
    social: "@misspragmatic",
  },
} as const;
