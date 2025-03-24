import Link from "next/link";
import React from "react";
import { ButtonLink } from "./ButtonLink";
import { Logo } from "./Logo";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";

export async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <header className="header absolute left-0 right-0 top-0 z-50 ~h-32/48 ~px-4/6 ~py-4/6 hd:h-32">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[auto,auto] items-center gap-6 md:grid-cols-[1fr,auto,1fr]">
        <Link href="/" className="justify-self-start">
          <Logo className="text-brand-purple" />
        </Link>
        <nav
          aria-label="Main"
          className="col-span-full row-start-2 md:col-span-1 md:col-start-2 md:row-start-1"
        >
          <ul className="flex flex-wrap items-center justify-center gap-8 font-hussar">
            {settings.data.navigation.map((item) => (
              <li key={item.link.text}>
                <PrismicNextLink field={item.link} className="~text-lg/xl text-brand-logo" />
              </li>
            ))}
          </ul>
        </nav>
        <div className="justify-self-end">
          <ButtonLink href="https://www.fresha.com/a/namaste-beauty-maple-ridge-330-22709-lougheed-highway-ipll3c3v/all-offer?menu=true&pId=860852" target="_blank" icon="whatsapp" color="logo" aria-label="WhatsApp">
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
