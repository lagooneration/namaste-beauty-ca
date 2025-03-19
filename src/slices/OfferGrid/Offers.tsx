import { ButtonLink } from "@/components/ButtonLink";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { Scribble } from "./Scribble";
import clsx from "clsx";

type Props = {
  offer: Content.OffersDocument;
  index: number;
};

export function Offer({ offer, index }: Props) {
  const colors = [
    "text-brand-blue",
    "text-brand-lime",
    "text-brand-orange",
    "text-brand-pink",
    "text-brand-purple",
  ];

  const scribbleColor = colors[index];

  const price = isFilled.number(offer.data.price)
    ? `$${(offer.data.price / 100).toFixed(2)}`
    : "Price Not Available";


  return (
    <div className="skater group relative flex flex-col items-center gap-4">
      <div className="stack-layout overflow-hidden">
        <PrismicNextImage
          field={offer.data.photo_background}
          width={500}
          imgixParams={{ q: 20 }}
          alt=""
          className="scale-110 transform transition-all duration-1000 ease-in-out group-hover:scale-100 group-hover:brightness-75 group-hover:saturate-[.8]"
        />
        <Scribble className={clsx("relative", scribbleColor)} />
        <PrismicNextImage
          field={offer.data.photo_foreground}
          width={500}
          alt=""
          className="transform transition-transform duration-1000 ease-in-out group-hover:scale-110"
        />
        <div className="relative h-48 w-full place-self-end bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <h3 className="relative grid place-self-end justify-self-start p-2 text-brand-gray ~text-2xl/3xl">
          <span className="mb-[-.3em] block font-sans">{offer.data.name}</span>
          <p className="font-variant-numeric tabular-nums">{price}</p>
        </h3>
      </div>
      <div className="relative inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <ButtonLink 
        field={offer.data.button}
        icon="cart"
        color="logo"
        >Book Now</ButtonLink>
      </div>
    </div>
  );
}