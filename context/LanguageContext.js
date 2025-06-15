'use client'
import { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const searchParams = useSearchParams();
  const [language, setLanguage] = useState("English (International)");

  useEffect(() => {
    const urlLanguage = searchParams.get('language');
    const storedLanguage = localStorage.getItem("language");

    if (urlLanguage && urlLanguage !== language) {
      setLanguage(urlLanguage);
      localStorage.setItem("language", urlLanguage);
    } else if (storedLanguage && storedLanguage !== language) {
      setLanguage(storedLanguage);
    }
  }, [searchParams]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
