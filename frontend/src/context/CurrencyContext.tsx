import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Currency = "NGN" | "USD";

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

const STORAGE_KEY = "webinar_currency";

function readStoredCurrency(): Currency {
  if (typeof window === "undefined") return "USD";

  const fromSession = window.sessionStorage.getItem(STORAGE_KEY);
  if (fromSession === "NGN" || fromSession === "USD") {
    return fromSession;
  }

  const fromCookie = document.cookie
    .split("; ")
    .map((entry) => entry.split("="))
    .find(([key]) => key === "currency");
  if (fromCookie?.[1] === "NGN" || fromCookie?.[1] === "USD") {
    return fromCookie[1] as Currency;
  }

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  const locale = `${navigator.language || ""} ${navigator.languages?.join(" ") || ""}`.toLowerCase();
  if (timezone === "Africa/Lagos" || locale.includes("ng") || locale.includes("nigeria")) {
    return "NGN";
  }

  return "USD";
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(() => readStoredCurrency());

  useEffect(() => {
    window.sessionStorage.setItem(STORAGE_KEY, currency);
  }, [currency]);

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
    }),
    [currency]
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
