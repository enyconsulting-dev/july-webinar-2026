// /home/obed/Documents/free-webinar-sales/frontend/src/components/Countdown.tsx

import { useEffect, useMemo, useState } from "react";

import { config } from "../config";

/**
 * Live countdown to the event. If no real date is configured, it counts down
 * to a rolling target (now + 5 days) so the funnel always shows urgency.
 */
export default function Countdown() {
  const target = useMemo(() => {
    if (config.event.startsAt) return new Date(config.event.startsAt).getTime();
    return Date.now() + 5 * 24 * 60 * 60 * 1000; // placeholder: 5 days out
  }, []);

  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  const units = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Mins", value: mins },
    { label: "Secs", value: secs },
  ];

  return (
    <div className="flex items-center gap-3">
      {units.map((u) => (
        <div
          key={u.label}
          className="flex min-w-[64px] flex-col items-center rounded-xl border border-gold/20 bg-ink-800/70 px-3 py-2"
        >
          <span className="font-display text-2xl font-semibold text-gold-light tabular-nums">
            {String(u.value).padStart(2, "0")}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-cream/50">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}
