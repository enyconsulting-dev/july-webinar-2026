// /home/obed/Documents/free-webinar-sales/frontend/src/vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE?: string;
  readonly VITE_ZOOM_URL?: string;
  readonly VITE_VIP_CHECKOUT_URL?: string;
  readonly VITE_PLATINUM_CHECKOUT_URL?: string;
  readonly VITE_EVENT_STARTS_AT?: string;
  readonly VITE_GHL_CALENDAR_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
