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
  title: "OTP Verification - Interactive Input with Animations",
  description: "Experience a custom OTP input component with animated caret, success/error styling, and vibration feedback. Built with Next.js and Tailwind CSS.",
  keywords: ["OTP", "verification", "input", "animation", "Next.js", "Tailwind CSS", "React"],
  authors: [{ name: "OTP Demo App" }],
  openGraph: {
    title: "OTP Verification Demo",
    description: "Interactive OTP input with animations and visual feedback",
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased grid place-items-center`}
      >
        {children}
      </body>
    </html>
  );
}
