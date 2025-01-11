"use client"; // Asegura que el código se ejecute solo en el cliente
import { useRouter } from 'next/navigation'; // Importa correctamente el router
import { useEffect } from 'react';
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
  const router = useRouter(); // Usar el router de Next.js para redirección

  useEffect(() => {
    // Redirigir a la ruta de login al cargar la página
    router.push('/auth/login');
  }, [router]);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* Espacio para el contenido debajo de la Navbar */}
        <main className="w-full min-h-screen bg-slate-50">
          {children}
        </main>
      </body>
    </html>
  );
}
