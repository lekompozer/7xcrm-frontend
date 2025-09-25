import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../contexts/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "7x CRM Admin Dashboard",
  description: "Admin dashboard for 7x CRM subscription and customer management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
