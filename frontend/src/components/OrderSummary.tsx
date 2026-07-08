// /home/obed/Documents/free-webinar-sales/frontend/src/components/OrderSummary.tsx

interface Row {
  label: string;
  value: string;
  emphasis?: boolean;
}

interface OrderSummaryProps {
  rows: Row[];
  priceLabel: string;
  price: string;
}

/** Reusable order-summary card used on both checkout pages. */
export default function OrderSummary({ rows, priceLabel, price }: OrderSummaryProps) {
  return (
    <div className="card">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold-light">
        Your Order Summary
      </h3>
      <dl className="divide-y divide-white/10">
        {rows.map((r) => (
          <div key={r.label} className="flex items-start justify-between gap-4 py-3">
            <dt className="text-sm text-cream/60">{r.label}</dt>
            <dd
              className={`max-w-[60%] text-right text-sm ${
                r.emphasis ? "font-semibold text-cream" : "text-cream/80"
              }`}
            >
              {r.value}
            </dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 flex items-center justify-between rounded-xl bg-gold/10 px-4 py-3">
        <span className="text-sm font-semibold uppercase tracking-wide text-gold-light">
          {priceLabel}
        </span>
        <span className="font-display text-3xl font-bold text-gold-light">{price}</span>
      </div>
    </div>
  );
}
