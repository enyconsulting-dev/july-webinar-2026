import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const SOCIAL_IMAGES = [
  "/social1.jpeg",
  "/social2.jpeg",
  "/social3.jpeg",
  "/social4.jpeg",
  "/social5.jpeg",
  "/social6.jpeg",
  "/social7.jpeg",
  "/social8.jpeg",
  "/social9.jpeg"
];

export default function SocialProofSlider() {
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % SOCIAL_IMAGES.length);
    }, 10000); // Change slide every 3 seconds

    // Update visible count based on viewport size
    const updateVisibleCount = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        if (width >= 1024) setVisibleCount(3); // Desktop: 3 images
        else if (width >= 640) setVisibleCount(2); // Tablet: 2 images
        else setVisibleCount(1); // Mobile: 1 image
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => {
      clearInterval(id);
      window.removeEventListener('resize', updateVisibleCount);
    };
  }, []);

  // Calculate visible indices
  const getVisibleIndices = () => {
    const indices = [];
    for (let i = 0; i < visibleCount; i++) {
      const idx = (index + i) % SOCIAL_IMAGES.length;
      indices.push(idx);
    }
    return indices;
  };

  const visibleIndices = getVisibleIndices();

  return (
    <motion.div
      ref={sliderRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative overflow-hidden"
    >
      <div className="flex transition-transform duration-700 ease-in-out">
        {visibleIndices.map((idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-2"
          >
            <img
              src={SOCIAL_IMAGES[idx]}
              alt={`Social proof ${idx + 1}`}
              className="w-full h-auto rounded-lg shadow-lg object-cover"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {SOCIAL_IMAGES.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
              visibleIndices.includes(i)
                ? "bg-gold/80"
                : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Show social proof ${i + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}