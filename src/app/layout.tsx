import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { MotionConfig } from "motion/react";

import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
});

// Set SITE_URL once deployed so absolute OG/Twitter image URLs resolve correctly.
// Server-only: this is read in layout.tsx's metadata export (always server-side,
// never shipped to the client bundle), so it doesn't need the NEXT_PUBLIC_ prefix.
const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

const title = "Relay — Background jobs that don't wake you up at 2 a.m.";
const description =
  "Relay schedules, retries, and monitors your jobs — with a dashboard that tells you what broke before your users do.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Relay",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <MotionConfig reducedMotion="user">
            <TooltipProvider>
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
              <Toaster />
            </TooltipProvider>
          </MotionConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}
