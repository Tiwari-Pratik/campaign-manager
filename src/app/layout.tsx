import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./myComponents/header";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "the Campaign Manager",
  description: "Create and Manage your Ad Campaigns",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
