import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { FaStar } from "react-icons/fa6";

import { createClient } from "@/prismicio";
import { ButtonLink } from "@/components/ButtonLink";
import { HorizontalLine, VerticalLine } from "@/components/Line";
import clsx from "clsx";
import { Scribble } from "./Scribble";
import { SlideIn } from "@/components/SlideIn";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import Image from "next/image";
import ServiceCard from "@/components/ui/service-card";

async function getDominantColor(url: string) {
  const paletteURL = new URL(url);
  paletteURL.searchParams.set("palette", "json");

  const res = await fetch(paletteURL);
  const json = await res.json();

  return (
    json.dominant_colors.vibrant?.hex || json.dominant_colors.vibrant_light?.hex
  );
}

type Props = {
  id: string;
};

export async function Addon({ id }: Props) {
  const client = createClient();
  const service = await client.getByID<Content.ServiceDocument>(id);

  const price = isFilled.number(service.data.price)
    ? parseFloat(((service.data.price - 0.01) / 100).toFixed(2)) // Convert cents to dollars with 2 decimal places and subtract 0.01
    : 0;

  let discountPercentage;
  if (service.data.save_offer && isFilled.link(service.data.discount)) {
    const discountDoc = await client.getByID<Content.DiscountDocument>(service.data.discount.id);
    discountPercentage = discountDoc.data.sale_percentage;
  }

  return (
    <Accordion className='flex w-full flex-col divide-y divide-zinc-200 dark:divide-zinc-700 pt-2'>
      <AccordionItem value={service.data.name || "Service"}>
        <AccordionTrigger className='w-full py-0.5 text-left'>
          <div className="flex flex-col w-full z-10">
            <ServiceCard
              serviceName={service.data.name || "Service"}
              price={price}
              discountPercentage={discountPercentage || undefined}
            />
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <p className='font-mono font-extralight text-left'>
            We Do Recommend Brow Tint For Fuller Looking Brows And More Definition That Last For 3-4 Weeks.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}