import type React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";

import { ClientProviders } from "@/providers/ClientProviders";

import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hanken-grotesk",
});

export const metadata: Metadata = {
  title: "Home - Admin Dashboard",
  description: "A point to manage your stores, categories and products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        {/* added `suppressHydrationWarning={true}` to avoid triggering hydration errors caused on browser extensions like Grammarly */}
        <body
          className={hankenGrotesk.className}
          suppressHydrationWarning={true}
        >
          <ClientProviders>{children}</ClientProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
