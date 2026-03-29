"use client";
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex overflow-x-hidden bg-[#c9d6e3] dark:bg-gray-800 transition-colors duration-300">
        <div className="w-full p-4 md:p-8 ml-0 md:ml-64 pt-16 md:pt-8 overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
