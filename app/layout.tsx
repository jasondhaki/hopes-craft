import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Hope's Craft",
  description: "Heritage Storytelling & Sustainable Jute Commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="hopetheme">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-jute-base text-forest-slate min-h-screen flex flex-col`}>
        <Navbar />
        {/* The main content area will expand to push the footer down */}
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}