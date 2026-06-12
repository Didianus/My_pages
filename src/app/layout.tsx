import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paskalis Didianus Jeharus — Creative Developer & Designer",
  description:
    "Premium portfolio of Paskalis Didianus Jeharus — Full-Stack Developer, UI/UX Designer, and Creative Technologist crafting digital experiences that inspire.",
  keywords: [
    "portfolio",
    "developer",
    "designer",
    "creative",
    "full-stack",
    "UI/UX",
    "web development",
  ],
  authors: [{ name: "Paskalis Didianus Jeharus" }],
  icons: {
    icon: "/profil4.png",
  },
  openGraph: {
    title: "Paskalis Didianus Jeharus — Creative Developer & Designer",
    description: "Crafting digital experiences that inspire and transform.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground overflow-x-hidden`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
