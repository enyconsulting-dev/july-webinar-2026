import { useState } from "react";
import { motion } from "framer-motion";

interface ResponsiveVideoProps {
  /** The Vimeo video ID (just the numeric part) */
  videoId: string;
  /** Optional width (default: "100%") */
  width?: string | number;
  /** Optional height (default: "100%") */
  height?: string | number;
  /** Additional CSS classes */
  className?: string;
  /** Adds a gentle floating animation (nice for hero/portrait art). */
  float?: boolean;
  /** Border radius utility class (default: "rounded-2xl") */
  rounded?: string;
}

/**
 * A responsive video embed component. Shows a polished animated placeholder with a
 * shimmer sweep until you provide a real `videoId`. Replace freely later.
 */
export default function ResponsiveVideo({
  videoId,
  width,
  height,
  className = "",
  float = false,
  rounded = "rounded-2xl",
}: ResponsiveVideoProps) {
  const [failed, setFailed] = useState(false);
  const showVideo = videoId && !failed;

  const inner = (
    <div
      className={`relative overflow-hidden ${rounded} border border-white/10 bg-ink-700 shadow-card ${className}`}
      style={{
        aspectRatio: "16/9", // Fixed aspect ratio for video
      }}
    >
      {showVideo ? (
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`}
          title="Video"
          width={width ?? "100%"}
          height={height ?? "100%"}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
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
              Video placeholder
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