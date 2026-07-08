// /home/obed/Documents/free-webinar-sales/frontend/src/api.ts

import { config } from "./config";

export interface LeadPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  source?: string;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
}

export interface LeadResponse {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  ghl_synced: string;
  created_at: string;
  zoom_registration_url: string;
}

function readUtm() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
  };
}

export async function createLead(
  data: Omit<LeadPayload, "utm_source" | "utm_medium" | "utm_campaign">
): Promise<LeadResponse> {
  const res = await fetch(`${config.apiBase}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, ...readUtm() }),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Registration failed (${res.status}): ${detail}`);
  }
  return res.json();
}

export async function createOrder(
  email: string,
  product: "vip" | "platinum"
): Promise<void> {
  // Fire-and-track: records upsell intent. Non-blocking for the user flow.
  try {
    await fetch(`${config.apiBase}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, product }),
    });
  } catch {
    // Analytics-only; never block the funnel on this.
  }
}
