import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Container from "@/components/container";
import Navbar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Best Boarding Schools in India (2026) – Top Schools, Fees, Reviews & Admissions | UniPortal",
  description:
    "Browse the top residential and boarding schools in India. Compare CBSE/ICSE schools by fee structure, reviews, academic results, and campus facilities. Ask our experts.",
    openGraph: {
    title: "SketchReps",
    description: "Build the foundation of your drawing with daily sketch reps. A simple tool to help you practice and improve your drawing skills with daily sketching exercises with your own gallery of references.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "SketchReps",
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="bg-neutral-100 text-neutral-900">
        <Container>
          <Navbar />
          {children}
        </Container>
      </body>
    </html>
  );
}
