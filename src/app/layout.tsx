import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CaseFlow — AI-Powered Indian Legal Research",
    template: "%s | CaseFlow",
  },
  description:
    "Upload any Indian court judgment and instantly extract facts, legal issues, precedents, and AI-generated legal insights. Your AI-powered legal research assistant.",
  keywords: [
    "Indian law",
    "legal research",
    "case analysis",
    "AI legal assistant",
    "court judgments",
    "precedents",
    "legal brief",
    "CaseFlow",
  ],
  authors: [{ name: "CaseFlow" }],
  openGraph: {
    title: "CaseFlow — Research Indian Case Law in Seconds",
    description:
      "Upload any judgment and instantly extract facts, legal issues, precedents, and AI-generated legal insights.",
    type: "website",
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
      className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-navy-deep text-text-primary">
        <TooltipProvider delay={300}>
          {children}
        </TooltipProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#FFFFFF",
            },
          }}
        />
      </body>
    </html>
  );
}
