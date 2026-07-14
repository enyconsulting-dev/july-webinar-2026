import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Currency = "NGN" | "USD";

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

const STORAGE_KEY = "webinar_currency";

function readStoredCurrency(): Currency | null {
  if (typeof window === "undefined") return null;

  const fromSession = window.sessionStorage.getItem(STORAGE_KEY);
  if (fromSession === "NGN" || fromSession === "USD") {
    return fromSession as Currency;
  }

  const fromCookie = document.cookie
    .split("; ")
    .map((entry) => entry.split("="))
    .find(([key]) => key === "currency");
  if (fromCookie?.[1] === "NGN" || fromCookie?.[1] === "USD") {
    return fromCookie[1] as Currency;
  }

  return null;
}

function inferCurrencyFromBrowser(): Currency {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  const locale = `${navigator.language || ""} ${navigator.languages?.join(" ") || ""}`.toLowerCase();
  const maybeNigeria = /(^|[\s_-])(ng|nigeria|lagos)(\b|$)/.test(locale) || timezone === "Africa/Lagos";

  if (maybeNigeria) {
    return "NGN";
  }

  return "USD";
}

async function detectCurrencyFromClient(): Promise<Currency> {
  if (typeof window === "undefined") return "USD";

  try {
    const response = await fetch("https://ipapi.co/json/", {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error("ip lookup failed");
    }

    const data = (await response.json()) as { currency?: string; country_code?: string };
    const apiCurrency = data.currency?.toUpperCase();
    if (apiCurrency === "NGN" || apiCurrency === "USD") {
      return apiCurrency as Currency;
    }

    if (data.country_code?.toUpperCase() === "NG") {
      return "NGN";
    }
  } catch {
    // Fall back to browser locale/timezone if IP lookup is unavailable.
  }

  return inferCurrencyFromBrowser();
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(() => readStoredCurrency() ?? inferCurrencyFromBrowser());

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = readStoredCurrency();
    if (stored) {
      setCurrency(stored);
      return;
    }

    let cancelled = false;

    void detectCurrencyFromClient().then((detected) => {
      if (!cancelled) {
        setCurrency(detected);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

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
