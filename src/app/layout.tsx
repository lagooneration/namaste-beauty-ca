import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { createClient } from "@/prismicio";
import { Advent_Pro } from "next/font/google";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
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
        className={`${geistSans.variable} ${hussar.variable} ${adventPro.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
