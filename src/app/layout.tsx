import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { createClient } from "@/prismicio";
import { Advent_Pro, Bowlby_One_SC, DM_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { SVGFilters } from "@/components/SVGFilters";

const bowlby = Bowlby_One_SC({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bowlby-sc",
  weight: "400",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-mono",
  weight: "500",
});


const adventPro = Advent_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-advent-pro",
  weight: "400",
})
const hussar = localFont({
  src: "./fonts/HussarBold.woff",
  variable: "--font-hussar",
  weight: "100 900",
});



export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: settings.data.site_title,
    description: settings.data.meta_description,
    openGraph: {
      images: settings.data.fallback_og_image.url ?? undefined,
    },
  };
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bowlby.variable} ${hussar.variable} ${dmMono.variable} ${adventPro.variable} antialiased`}
      >
        <Header />
        {children}
        <SVGFilters />
        <Footer />
      </body>
    </html>
  );
}
