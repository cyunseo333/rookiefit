import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_KR } from "next/font/google";
import { AppProviders } from "@/components/AppProviders";
import "./globals.css";

const logoFont = Cormorant_Garamond({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const bodyFont = Noto_Sans_KR({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "RookieFit",
  description: "체형 맞춤형 K패션 쇼핑몰",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${logoFont.variable} ${bodyFont.variable}`}>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
