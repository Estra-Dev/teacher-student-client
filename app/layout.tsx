import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
// import Nav from "@/components/Nav";
// import SideBar from "@/components/SideBar";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
import Nav from "@/components/Nav";
import RootLayoutClient from "@/components/RootLayerClients";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PrinceLearner",
  description: "Created by Dev King",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <RootLayoutClient>
            <Nav />
            {/* <SideBar /> */}
            {children}
            <Footer />
          </RootLayoutClient>
        </body>
      </html>
    </ClerkProvider>
  );
}
