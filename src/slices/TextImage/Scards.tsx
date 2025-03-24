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
import ServiceCards from "@/components/ui/service-cards";

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

export async function Scards({ id }: Props) {
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
    <div className="w-full py-2">
      <ServiceCards
        serviceName={service.data.name || "Service"}
        price={price}
        discountPercentage={discountPercentage || undefined}
        description={service.data.description || ""}
        icon={service.data.icon}
      />
    </div>
  );
}





