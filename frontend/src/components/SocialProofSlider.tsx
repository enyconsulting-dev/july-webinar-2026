import { motion } from "framer-motion";

export default function SocialProofSlider() {
  const imageCount = 9;
  const images = Array.from({ length: imageCount }, (_, i) => i + 1);

  return (
    <div className="grid gap-6">
      {images.map((num) => (
        <motion.div
          key={num}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: (num - 1) * 0.05, // Staggered animation
          }}
          className="w-full md:w-1/2 lg:w-1/3"
        >
          <img
            src={`/Feedback_${num}.png`}
            alt={`Testimonial ${num}`}
            className="w-full h-auto rounded-lg shadow-lg object-cover"
            loading="lazy"
          />
        </motion.div>
      ))}
    </div>
  );
}