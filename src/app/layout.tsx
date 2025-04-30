import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "City Pop Girl",
  description: "Web radio for City Pop Girl lovers",
  openGraph: {
    title: "City Pop Girl Player",
    description: "Web radio for City Pop Girl lovers",
    type: "website",
    locale: "en_US",
    siteName: "citygirlpop.space",
    images: [
      {
        url: "https://imgur.com/gpwtHaR.png",
        width: 900,
        height: 530,
        alt: "citygirlpop.space",
      },
    ],
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
