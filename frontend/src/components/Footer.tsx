// /home/obed/Documents/free-webinar-sales/frontend/src/components/Footer.tsx

import { config } from "../config";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container-tight flex flex-col items-center gap-4 text-center">
        <p className="font-display text-lg text-cream/90">
          {config.brand.company} · {config.brand.school}
        </p>
        <p className="max-w-xl text-xs leading-relaxed text-cream/50">
          Your information is private and will never be sold or shared. Unsubscribe at any
          time. Questions about your order or access? Email{" "}
          <a
            href={`mailto:${config.supportEmail}`}
            className="text-gold-light hover:underline"
          >
            {config.supportEmail}
          </a>
          .
        </p>
        <p className="text-[11px] text-cream/30">
          © {new Date().getFullYear()} {config.brand.company}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
