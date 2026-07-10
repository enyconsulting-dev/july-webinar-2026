// /home/obed/Documents/free-webinar-sales/frontend/src/main.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";
import RootLayout from "./RootLayout";
import { CurrencyProvider } from "./context/CurrencyContext";
import OptInPage from "./pages/OptInPage";
import ThankYouPage from "./pages/ThankYouPage";
import VipCheckoutPage from "./pages/VipCheckoutPage";
import VipThankYouPage from "./pages/VipThankYouPage";
import PlatinumCheckoutPage from "./pages/PlatinumCheckoutPage";
import PlatinumThankYouPage from "./pages/PlatinumThankYouPage";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <OptInPage /> },
      { path: "/thank-you", element: <ThankYouPage /> },
      { path: "/vip-checkout", element: <VipCheckoutPage /> },
      { path: "/vip-confirmed", element: <VipThankYouPage /> },
      { path: "/platinum-checkout", element: <PlatinumCheckoutPage /> },
      { path: "/platinum-confirmed", element: <PlatinumThankYouPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CurrencyProvider>
      <RouterProvider router={router} />
    </CurrencyProvider>
  </React.StrictMode>
);
