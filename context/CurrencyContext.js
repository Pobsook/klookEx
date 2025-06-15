'use client'
import { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const searchParams = useSearchParams(); // ✅ เรียกครั้งเดียว
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    const urlCurrency = searchParams.get('currency');
    const storedCurrency = localStorage.getItem("currency");

    if (urlCurrency && urlCurrency !== currency) {
      setCurrency(urlCurrency);
      localStorage.setItem("currency", urlCurrency);
    } else if (storedCurrency && storedCurrency !== currency) {
      setCurrency(storedCurrency);
    }
  }, [searchParams]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
