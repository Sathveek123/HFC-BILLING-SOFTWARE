import type { Metadata } from "next";
import "./globals.css";
import { AppStateProvider } from "@/lib/store";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "HFC RESTAURANT - TINDI KLUBB | POS Billing & Management",
  description: "Enterprise SaaS POS Billing, AI Menu Photo Scanner & Inventory Management for HFC Restaurant - Tindi Klubb.",
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.jpg" priority="true" />
        <link rel="apple-touch-icon" href="/logo.jpg" />
      </head>
      <body className="bg-white text-[#111827] antialiased">
        <AppStateProvider>
          <AppShell>{children}</AppShell>
        </AppStateProvider>
      </body>
    </html>
  );
}
