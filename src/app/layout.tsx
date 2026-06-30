import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Barlow_Condensed } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://peakroofing.com"),
  title: "Peak Roofing | Austin Texas Roofing & Gutters",
  description:
    "Peak Roofing, Austin, Texas's trusted roofing and gutter contractor. Quality craftsmanship, free inspections, and financing available.",
  openGraph: {
    title: "Peak Roofing | Austin Texas Roofing & Gutters",
    description:
      "Peak Roofing, Austin, Texas's trusted roofing and gutter contractor. Quality craftsmanship, free inspections, and financing available.",
    url: "https://peakroofing.com",
    siteName: "Peak Roofing",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo-og.png",
        width: 1200,
        height: 630,
        alt: "Peak Roofing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Peak Roofing | Austin Texas Roofing & Gutters",
    description:
      "Peak Roofing, Austin, Texas's trusted roofing and gutter contractor. Quality craftsmanship, free inspections, and financing available.",
    images: ["/logo-og.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${barlowCondensed.variable}`}>
      <body className="min-h-screen bg-background antialiased" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
        {children}
        <Script
          src="https://n8n.hermes-codesavan.xyz/widget/chat-widget.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
