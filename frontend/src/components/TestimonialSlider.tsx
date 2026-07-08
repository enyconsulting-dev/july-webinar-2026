// /home/obed/Documents/free-webinar-sales/frontend/src/components/TestimonialSlider.tsx

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

// Placeholder social proof. Replace copy/names with real attendee results.
const SLIDES = [
  {
    quote:
      "I stopped underpricing myself in one week. My first consulting proposal closed at 4x what I used to charge.",
    name: "A. Okafor",
    role: "Ex-Analyst → Independent Consultant",
  },
  {
    quote:
      "Eno's system gave me a repeatable way to land clients without a big following. Two retainers in 30 days.",
    name: "M. Thompson",
    role: "Career-Switcher, Toronto",
  },
  {
    quote:
      "I finally packaged my expertise into an offer people pay for. The 90-day plan made it obvious.",
    name: "S. Bello",
    role: "Finance Professional",
  },
];

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);

  const slide = SLIDES[index];

  return (
    <div className="card relative overflow-hidden">
      <div className="absolute left-6 top-4 font-display text-6xl leading-none text-gold/25">
        “
      </div>
      <div className="relative min-h-[150px]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="flex h-full flex-col justify-between gap-4 pt-6"
          >
            <p className="text-lg leading-relaxed text-cream/90">{slide.quote}</p>
            <footer className="text-sm">
              <span className="font-semibold text-gold-light">{slide.name}</span>
              <span className="text-cream/50"> · {slide.role}</span>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            aria-label={`Show testimonial ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-8 bg-gold" : "w-3 bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
