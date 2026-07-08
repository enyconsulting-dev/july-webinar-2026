// /home/obed/Documents/free-webinar-sales/frontend/src/components/PlaceholderImage.tsx

import { motion } from "framer-motion";
import { useState } from "react";

interface PlaceholderImageProps {
  /**
   * Path to a real image (e.g. "/images/eno-hero.jpg"). If it exists it is
   * shown; otherwise the animated placeholder renders. Drop your files into
   * frontend/public/images and set this prop — no code change needed.
   */
  src?: string;
  alt: string;
  /** Caption shown on the placeholder so you know what to replace. */
  label?: string;
  /** aspect ratio, e.g. "4/5", "16/9", "1/1". */
  aspect?: string;
  className?: string;
  /** Adds a gentle floating animation (nice for hero/portrait art). */
  float?: boolean;
  rounded?: string;
}

/**
 * A drop-in image slot. Shows a polished animated gradient placeholder with a
 * shimmer sweep until you provide a real `src`. Replace freely later.
 */
export default function PlaceholderImage({
  src,
  alt,
  label = "Image placeholder",
  aspect = "4/5",
  className = "",
  float = false,
  rounded = "rounded-2xl",
}: PlaceholderImageProps) {
  const [failed, setFailed] = useState(false);
  const showReal = src && !failed;

  const inner = (
    <div
      className={`relative overflow-hidden ${rounded} border border-white/10 bg-ink-700 shadow-card ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {showReal ? (
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <>
          {/* Animated gradient field */}
          <div className="absolute inset-0 bg-gradient-to-br from-ink-700 via-ink-800 to-ink" />
          <div
            className="absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(120% 120% at 20% 10%, rgba(201,162,39,0.35), transparent 55%)",
            }}
          />
          {/* Shimmer sweep */}
          <div
            className="absolute inset-0 animate-shimmer"
            style={{
              backgroundImage:
                "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.10) 50%, transparent 70%)",
              backgroundSize: "200% 100%",
            }}
          />
          {/* Decorative frame + label */}
          <div className="absolute inset-4 rounded-xl border border-dashed border-gold/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              className="text-gold/70"
            >
              <path
                d="M4 16l4.5-6 3.5 4.5L15 11l5 5M4 4h16v16H4z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-light/80">
              {label}
            </span>
          </div>
        </>
      )}
    </div>
  );

  if (!float) return inner;

  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      {inner}
    </motion.div>
  );
}
