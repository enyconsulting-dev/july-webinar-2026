// /home/obed/Documents/free-webinar-sales/frontend/tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette — premium executive consulting.
        ink: {
          DEFAULT: "#0B1020",
          800: "#111a33",
          700: "#1a2445",
        },
        cream: "#FBF8F1",
        gold: {
          DEFAULT: "#C9A227",
          light: "#E4C767",
          dark: "#9C7C1A",
        },
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        gold: "0 10px 40px -10px rgba(201,162,39,0.45)",
        card: "0 20px 60px -20px rgba(11,16,32,0.35)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
      animation: {
        shimmer: "shimmer 3s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
