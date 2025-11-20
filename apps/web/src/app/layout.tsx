import type { Metadata, Viewport } from "next";
import { Poppins, Inter } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["600"], // Semibold only
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600"], // Regular, Medium, and Semibold
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Webflow AI Assistant - Ask anything about Webflow",
  description: "Get instant, accurate answers to your Webflow questions powered by AI. Search through Webflow University, API docs, blog posts, and forums.",
  keywords: ["Webflow", "AI", "Assistant", "Documentation", "Help", "RAG", "Search"],
  authors: [{ name: "Webflow" }],
  openGraph: {
    title: "Webflow AI Assistant",
    description: "Get instant, accurate answers to your Webflow questions powered by AI",
    type: "website",
    siteName: "Webflow AI Assistant",
  },
  twitter: {
    card: "summary_large_image",
    title: "Webflow AI Assistant",
    description: "Get instant, accurate answers to your Webflow questions powered by AI",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#171717", // Webflow Gray 900
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${inter.variable} antialiased`}
      >
        {children}
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
