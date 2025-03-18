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

  const originalPrice = isFilled.number(service.data.price)
    ? `$${(service.data.price / 100).toFixed(2)}`
    : "Price Not Available";


    let discountedPrice;
    let discountPercentage;
    if (service.data.save_offer && isFilled.link(service.data.discount)) {
      const discountDoc = await client.getByID<Content.DiscountDocument>(service.data.discount.id);
      discountPercentage = discountDoc.data.sale_percentage;
      
      if (isFilled.number(service.data.price) && discountPercentage) {
        const discount = (service.data.price * discountPercentage) / 100;
        discountedPrice = `$${((service.data.price - discount) / 100).toFixed(2)}`;
      }
    }




  return (
        <Accordion className='flex w-full flex-col divide-y divide-zinc-200 dark:divide-zinc-700 pt-2'>
          <AccordionItem value={service.data.name || "Service"}>
            <AccordionTrigger className='w-full py-0.5 text-left'>
              <div className="flex flex-col w-full z-10">
                <div className="relative flex items-center justify-between w-96 py-3 px-4 rounded-lg bg-brand-pink/60 hover:bg-brand-gray/80 transition-colors duration-200">
                  {service.data.save_offer && discountPercentage && (
                    <div className="absolute bottom-2 left-20 bg-brand-orange text-brand-pink text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                      {discountPercentage}% OFF
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="text-brand-purple bg-white/30 backdrop-blur-xl p-2 rounded-lg shadow-sm">
                      <Image 
                        src="/Group.png" 
                        alt={service.data.name || "Service"} 
                        width={42} 
                        height={42}
                        className="object-contain" 
                      />
                    </div>
                    <div>
                      <p className="text-brand-purple font-hussar text-sm sm:text-base truncate max-w-[150px] sm:max-w-[200px]">
                        {service.data.name}
                      </p>
                    </div>
                  </div>
                  <div className="text-brand-purple hover:text-purple-500 font-hussar text-sm sm:text-base font-medium bg-brand-gray/40 py-1.5 px-3 rounded-md transition-colors">
                    {service.data.save_offer && discountedPrice ? (
                      <div className="flex flex-col items-end gap-0.5">
                        <span className="text-xs line-through opacity-70">{originalPrice}</span>
                        <span className="absolute top-1 right-8 text-amber-200 font-bold">{discountedPrice}</span>
                      </div>
                    ) : (
                      originalPrice
                    )}
                  </div>
                </div>
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