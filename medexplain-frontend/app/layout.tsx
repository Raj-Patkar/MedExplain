import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "MedExplain AI — Intelligent Medical Report Analysis",
    template: "%s | MedExplain AI",
  },
  description:
    "AI-powered platform for understanding medical reports and chest X-ray analysis with clinical-grade precision.",
  keywords: ["medical AI", "chest X-ray analysis", "medical report", "pneumonia detection"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}