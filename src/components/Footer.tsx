import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import React from "react";
import { asImageSrc } from "@prismicio/client";

import { createClient } from "@/prismicio";
import { Logo } from "@/components/Logo";
import { Bounded } from "./Bounded";
import Link from "next/link";
export async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");



  return (
    <footer className="bg-brand-logo text-brand-gray py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Namaste Beauty</h3>
            <p className="text-sm text-gray-300">
            Unlock your inner radiance with mindful self-care salon.
            </p>
          <Logo className="pointer-events-none relative h-20 mix-blend-exclusion md:h-28" />

          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-brand-lime transition">Home</Link></li>
              <li><Link href="/about" className="hover:text-brand-lime transition">About Us</Link></li>
              <li><Link href="/innovations" className="hover:text-brand-lime transition">Innovations</Link></li>
              <li><Link href="/contact" className="hover:text-brand-lime transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/blog" className="hover:text-brand-lime transition">Blog</Link></li>
              <li><Link href="/events" className="hover:text-brand-lime transition">Events</Link></li>
              <li><Link href="/research" className="hover:text-brand-lime transition">Research</Link></li>
              <li><Link href="/partners" className="hover:text-brand-lime transition">Partners</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="space-y-2">
              <p className="text-sm">Email: info@namastebeauty.com</p>
              <p className="text-sm">Phone: +1 (604) 477-2200</p>
              <div className="flex space-x-4 mt-4">
                <Link href="#" className="hover:text-brand-orange transition">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" className="hover:text-brand-orange transition">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Namaste Beauty. All rights reserved.</p>
        </div>
      </div>
    </footer>
    
  );
}


