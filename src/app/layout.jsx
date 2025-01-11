"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import localFont from "next/font/local";
import "./globals.css";

// Fuentes locales
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Layout({ children }) {
  const router = useRouter();

  useEffect(() => {
    // Redirige al login si no estás en la página correcta
    if (window.location.pathname !== '/auth/login') {
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* Renderiza las páginas hijas */}
        <main className="w-full min-h-screen bg-slate-50">{children}</main>
      </body>
    </html>
  );
}
