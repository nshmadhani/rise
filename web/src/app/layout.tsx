import type { Metadata } from "next";
import { Manrope, Outfit } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://riseto.app"),
  title: "Rise — Habits you’ll keep",
  description:
    "Track habits with beautiful color grids. Reflect in a line. Share wins when you want. Private by default.",
  openGraph: {
    title: "Rise — Habits you’ll keep",
    description:
      "A habit tracker with grids you’ll want to fill — plus optional reflection and shareable wins.",
    url: "https://riseto.app",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text">{children}</body>
    </html>
  );
}
