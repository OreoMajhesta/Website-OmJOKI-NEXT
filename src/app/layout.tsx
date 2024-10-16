import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from './functions/ThemeContext';
import Navbar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Om JOKI",
  description: "Solusi Joki Cepat, Murah, Anti Gelisah.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" type="image" href="/logo.webp" />
      <body>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
