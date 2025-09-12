import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
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
        className={`${roboto.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
