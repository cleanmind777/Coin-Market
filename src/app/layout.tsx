import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clean Mind - Crypto Monitor",
  description: "Track the cryptocurrency market with real-time data, trending coins, and comprehensive analytics.",
  keywords: ["cryptocurrency", "crypto", "bitcoin", "ethereum", "trading", "market", "monitor"],
  authors: [{ name: "Clean Mind Team" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
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
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}