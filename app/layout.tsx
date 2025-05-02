import type React from "react";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "learn.sol",
  description: "The first AI-assisted Solana learning and building platform",
  openGraph: {
    title: "learn.sol",
    description: "The first AI-assisted Solana learning and building platform",
    url: "https://learnsol.site",
    siteName: "learn.sol",
    images: [
      {
        url: "https://learnsol.site/og-image.png",
        width: 1200,
        height: 630,
        alt: "learn.sol - AI-assisted Solana Learning Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "learn.sol",
    description: "The first AI-assisted Solana learning and building platform",
    images: ["https://learnsol.site/og-image.png"],
    creator: "@learn_sol",
  },
  icons: {
    icon: "./favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
