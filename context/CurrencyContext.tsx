"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Currency = "USD" | "BDT";

interface CurrencyContextType {
  currency: Currency;
  toggleCurrency: () => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  // We still default to BDT exactly as you requested earlier
  const [currency, setCurrency] = useState<Currency>("BDT");

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === "USD" ? "BDT" : "USD"));
  };

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}