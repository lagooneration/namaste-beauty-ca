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

const VERTICAL_LINE_CLASSES =
  "absolute top-0 h-full stroke-2 text-stone-300 transition-colors group-hover:text-stone-400";

const HORIZONTAL_LINE_CLASSES =
  "-mx-8 stroke-2 text-stone-300 transition-colors group-hover:text-stone-400";

export async function Addon({ id }: Props) {
  const client = createClient();
  const service = await client.getByID<Content.ServiceDocument>(id);

  const price = isFilled.number(service.data.price)
    ? `$${(service.data.price / 100).toFixed(2)}`
    : "Price Not Available";

  const dominantColor = isFilled.image(service.data.image)
    ? await getDominantColor(service.data.image.url)
    : undefined;



  return (
    <div className="group relative mx-auto w-full max-w-72 px-8 pt-4 ">
          {/* <div className='mb-4 flex space-x-2'>
          {ITEMS.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`rounded-md px-3 py-1 text-sm font-medium ${
                activeIndex === index
                  ? 'bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                  : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
        <div className='overflow-hidden border-t border-zinc-200 dark:border-zinc-700'>
            <TransitionPanel
              activeIndex={activeIndex}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              variants={{
                enter: { opacity: 0, y: -50, filter: 'blur(4px)' },
                center: { opacity: 1, y: 0, filter: 'blur(0px)' },
                exit: { opacity: 0, y: 50, filter: 'blur(4px)' },
              }}
            >
              {ITEMS.map((item, index) => (
                <div key={index} className='py-2'>
                  <h3 className='mb-2 font-medium text-zinc-800 dark:text-zinc-100'>
                    {item.subtitle}
                  </h3>
                  <p className='text-zinc-600 dark:text-zinc-400'>{item.content}</p>
                </div>
              ))}
            </TransitionPanel>
          </div> */}
          
          <Accordion className='flex w-full flex-col divide-y divide-zinc-200 dark:divide-zinc-700'>
            <AccordionItem value='getting-started'>
              <AccordionTrigger className='w-full py-0.5 text-left'>
                <div className="flex items-center justify-between">
                {service.data.name}
                {service.data.price}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className='font-adventPro text-left'>
                   We Do Recommend Brow Tint For Fuller Looking Brows And More Definition That Last For 3-4 Weeks.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
    </div>
  );
}