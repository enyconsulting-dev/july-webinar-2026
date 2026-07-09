// /home/obed/Documents/free-webinar-sales/frontend/src/RootLayout.tsx

import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Footer from "./components/Footer";
import BackgroundFX from "./components/BackgroundFX";

/**
 * App shell shared by every funnel page: animated background, scroll reset on
 * navigation, and the global footer.
 */
export default function RootLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <BackgroundFX />
      <div className="relative z-10">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
