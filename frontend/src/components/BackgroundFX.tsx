// /home/obed/Documents/free-webinar-sales/frontend/src/components/BackgroundFX.tsx

import { motion } from "framer-motion";

/**
 * Ambient animated background: soft gold light-blooms drifting behind content.
 * Purely decorative and pointer-events-none.
 */
export default function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink-800 to-ink" />

      {/* Drifting gold blooms */}
      <motion.div
        className="absolute -left-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-gold/20 blur-[120px]"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-10rem] top-1/3 h-[30rem] w-[30rem] rounded-full bg-gold-dark/20 blur-[120px]"
        animate={{ x: [0, -50, 0], y: [0, 60, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
    </div>
  );
}
