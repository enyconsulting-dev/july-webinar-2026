// /home/obed/Documents/free-webinar-sales/frontend/src/components/ConfirmationBox.tsx

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ConfirmationBoxProps {
  title: string;
  children?: ReactNode;
}

/** Green-accented "you're confirmed" panel with an animated check. */
export default function ConfirmationBox({ title, children }: ConfirmationBoxProps) {
  return (
    <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/5 p-6 sm:p-8">
      <div className="flex items-center gap-4">
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 16 }}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-400/20"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <motion.path
              d="M5 13l4 4L19 7"
              stroke="#34d399"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </svg>
        </motion.div>
        <h3 className="text-xl font-semibold text-emerald-200 sm:text-2xl">{title}</h3>
      </div>
      {children && <div className="mt-4 text-sm leading-relaxed text-cream/80">{children}</div>}
    </div>
  );
}
