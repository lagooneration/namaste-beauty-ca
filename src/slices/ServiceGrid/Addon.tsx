import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { FaStar } from "react-icons/fa6";

import { createClient } from "@/prismicio";
import { HorizontalLine, VerticalLine } from "@/components/Line";
import clsx from "clsx";
import { Scribble } from "@/slices/ServiceGrid/Scribble";

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
      <VerticalLine className={clsx(VERTICAL_LINE_CLASSES, "left-4")} />
      <VerticalLine className={clsx(VERTICAL_LINE_CLASSES, "right-4")} />
      <HorizontalLine className={HORIZONTAL_LINE_CLASSES} />

      <div className="flex items-center justify-between ~text-sm/2xl text-brand-purple">
        <span>{price}</span>
        <span className="inline-flex items-center gap-1">
          <FaStar className="text-yellow-400" /> 5
        </span>
      </div>
      <div className="-mb-1 overflow-hidden py-4">
        <Scribble
          className="absolute inset-0 h-[60%] top-1/2 -translate-y-1/2 w-full"
          color={dominantColor}
        />
        <PrismicNextImage
          alt=""
          field={service.data.image}
          width={150}
          className=" mx-auto w-[58%] origin-top transform-gpu transition-transform duration-500 ease-in-out group-hover:scale-150"
        />
      </div>
      <HorizontalLine className={HORIZONTAL_LINE_CLASSES} />

      <h3 className="my-2 text-center font-sans leading-tight ~text-lg/xl text-brand-purple">
        {service.data.name}
      </h3>

      {/* <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <ButtonLink field={product.data.customizer_link}>Customize</ButtonLink>
      </div> */}
    </div>
  );
}