// /home/obed/Documents/free-webinar-sales/frontend/src/components/CheckoutEmbedZone.tsx

import { config } from "../config";

interface CheckoutEmbedZoneProps {
  ctaText: string;
  checkoutUrl: string;
  microcopy: string;
  onProceed?: () => void;
}

/**
 * [GHL EMBED ZONE — STRIPE/PAYMENT CHECKOUT FORM]
 *
 * Placeholder checkout block. Today the CTA routes to a configurable
 * GHL/Stripe checkout URL. To use GHL's native embedded checkout instead,
 * replace the button below with the GHL form <iframe> embed code.
 */
export default function CheckoutEmbedZone({
  ctaText,
  checkoutUrl,
  microcopy,
  onProceed,
}: CheckoutEmbedZoneProps) {
  const isPlaceholder = checkoutUrl.startsWith("#");

  return (
    <div className="card">
      <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-gold-light">
        Enter Your Payment Details
      </h3>
      <p className="mb-5 text-xs text-cream/50">
        {/* Remove this notice once the real embed / checkout link is wired. */}
        GHL EMBED ZONE — paste your Stripe/GHL checkout embed here, or set the
        checkout URL in config.
      </p>

      {/* Faux field rows to preview the layout of an embedded checkout. */}
      <div className="space-y-3 opacity-60">
        <div className="h-11 rounded-xl border border-dashed border-white/20 bg-ink/50" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-11 rounded-xl border border-dashed border-white/20 bg-ink/50" />
          <div className="h-11 rounded-xl border border-dashed border-white/20 bg-ink/50" />
        </div>
      </div>

      <a
        href={checkoutUrl}
        onClick={(e) => {
          if (isPlaceholder) e.preventDefault();
          onProceed?.();
        }}
        className="btn-cta mt-6 w-full"
      >
        {ctaText}
      </a>

      <p className="mt-3 text-center text-xs text-cream/50">{microcopy}</p>
      <p className="mt-3 text-center text-[11px] text-cream/40">
        🔒 Secured by Stripe · 256-bit SSL Encryption · Your payment information is never
        stored. Questions? {config.supportEmail}
      </p>
    </div>
  );
}
