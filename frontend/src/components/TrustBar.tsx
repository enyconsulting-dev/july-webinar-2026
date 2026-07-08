// /home/obed/Documents/free-webinar-sales/frontend/src/components/TrustBar.tsx

import { motion } from "framer-motion";

const OUTLETS = ["Forbes", "CTV", "CBC", "The Guardian"];
const HONORS = ["RBC Women of Influence", "Canada's Top 100 Most Powerful Women"];

/** "As seen in" logo strip. Uses text placeholders; swap for real logo SVGs. */
export default function TrustBar() {
  return (
    <div className="w-full">
      <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-cream/50">
        As Seen In
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        {OUTLETS.map((name, i) => (
          <motion.span
            key={name}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="font-display text-xl font-semibold text-cream/70 sm:text-2xl"
          >
            {name}
          </motion.span>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        {HONORS.map((h) => (
          <span
            key={h}
            className="rounded-full border border-gold/25 bg-gold/5 px-4 py-1.5 text-xs font-medium text-gold-light/90"
          >
            🏆 {h}
          </span>
        ))}
      </div>
    </div>
  );
}
