// app/layout.js

'use client'

import "./globals.css";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { LanguageProvider } from "@/context/LanguageContext";
import NavBar from "@/component/nav"

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head />
      <body>
        <LanguageProvider>
          <CurrencyProvider>
            <NavBar />
            {children}
          </CurrencyProvider>
        </LanguageProvider>
      </body>
    </html >
  );
}
