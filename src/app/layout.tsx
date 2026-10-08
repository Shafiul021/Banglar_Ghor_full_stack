import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://banlgarghorremodeling.com"),
  title: {
    default: "Banlgar Ghor Remodeling | Luxury Residential Remodeling in New York",
    template: "%s | Banlgar Ghor Remodeling",
  },
  description:
    "Banlgar Ghor Remodeling creates thoughtfully designed kitchens, bathrooms, additions, and whole-home renovations throughout New York City and Westchester.",
  keywords: [
    "New York remodeling",
    "NYC luxury renovation",
    "brownstone remodeling",
    "kitchen remodeling Manhattan",
    "bathroom renovation Brooklyn",
    "whole home renovation NYC",
    "Banlgar Ghor Remodeling",
  ],
  authors: [{ name: "Banlgar Ghor Remodeling" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://banlgarghorremodeling.com",
    siteName: "Banlgar Ghor Remodeling",
    title: "Banlgar Ghor Remodeling | Luxury Residential Remodeling in New York",
    description:
      "Thoughtful renovations. Exceptional craftsmanship. Homes designed around the way you live.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
        width: 1600,
        height: 900,
        alt: "Banlgar Ghor Remodeling - Luxury NYC Residential Remodeling",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Banlgar Ghor Remodeling | Luxury Residential Remodeling in New York",
    description:
      "Thoughtful renovations. Exceptional craftsmanship. Homes designed around the way you live.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${plusJakarta.variable} scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1F1E1D] antialiased selection:bg-[#9E7D4C] selection:text-white">
        {children}
      </body>
    </html>
  );
}
