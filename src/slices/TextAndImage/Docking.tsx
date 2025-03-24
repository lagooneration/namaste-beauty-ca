import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { FaStar } from "react-icons/fa6";
import {
  Activity,
  Component,
  HomeIcon,
  Mail,
  Package,
  ScrollText,
  SunMoon,
} from 'lucide-react';
import { createClient } from "@/prismicio";
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';

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

export async function Docking({ id }: Props) {
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

    const data = [
      {
        title: service?.data?.name || "Service",
        icon: (
          <div className="relative w-full h-full">
            <Image 
              src="/icons/icon3.png" 
              alt={service?.data?.name || "Service"} 
              fill
              className="object-contain p-2" 
            />
          </div>
        ),
        href: '#',
        price: service?.data?.save_offer && discountedPrice ? (
          <>
            <span className="text-xs line-through opacity-70">{originalPrice}</span>
            <span className="text-pink-400 font-bold">{discountedPrice}</span>
          </>
        ) : originalPrice,
        discount: service?.data?.save_offer && discountPercentage ? `${discountPercentage}% OFF` : null,
        description: 'We Do Recommend Brow Tint For Fuller Looking Brows And More Definition That Last For 3-4 Weeks.'
      },
    ];



  return (
    <div className='relative bottom-6 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4'>
      <Dock className='flex flex-row justify-center items-end gap-4 pb-3'>
        {data.map((item, idx) => (
          <DockItem
            key={idx}
            className='relative w-14 h-14 rounded-2xl bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-md 
              shadow-lg hover:bg-brand-pink/40 hover:scale-110 transition-all duration-300 border border-white/20'
          >
            <DockLabel 
              className='absolute bottom-full mb-4 min-w-[280px] max-w-[320px] p-4 h-full
                bg-gradient-to-br from-white/95 to-white/90 dark:from-neutral-900/95 dark:to-neutral-800/90 
                backdrop-blur-md shadow-xl rounded-xl border border-white/20 dark:border-neutral-700/30
                transform -translate-x-1/2 left-1/2'
            >
              <div className="flex flex-col gap-3">
                {/* Service Name with Icon */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-brand-pink/20 p-2 flex items-center justify-center">
                    <Image 
                      src="/icons/icon3.png" 
                      alt={item.title} 
                      width={32} 
                      height={32}
                      className="object-contain" 
                    />
                  </div>
                  <h3 className="text-brand-purple font-hussar text-lg leading-tight">
                    {item.title}
                  </h3>
                </div>
                
                {/* Discount Badge */}
                {item.discount && (
                  <div className="inline-flex items-center self-start px-3 py-1 rounded-full 
                    bg-brand-orange/10 border border-brand-orange/20">
                    <span className="text-xs font-bold text-brand-orange animate-pulse">
                      {item.discount}
                    </span>
                  </div>
                )}
                
                {/* Price and Rating Section */}
                <div className="flex items-center justify-between bg-white/50 dark:bg-neutral-800/50 
                  rounded-lg p-3 border border-white/50 dark:border-neutral-700/50">
                  <div className="flex flex-col">
                    <div className="text-brand-purple font-medium text-lg">
                      {item.price}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5 bg-white/80 dark:bg-neutral-700/80 
                    px-2 py-1 rounded-md">
                    <FaStar className="text-yellow-400 w-4 h-4" />
                    <span className="text-sm font-medium text-brand-purple">5.0</span>
                  </div>
                </div>

                {/* Description */}
                {item.description && (
                  <div className="bg-brand-purple/5 rounded-lg p-3 border border-brand-purple/10">
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 font-mono leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                )}
              </div>
            </DockLabel>
            
            <DockIcon className='w-full h-full p-2.5'>
              {item.icon}
            </DockIcon>
          </DockItem>
        ))}
      </Dock>
    </div>
  );
}