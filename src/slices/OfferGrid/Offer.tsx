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
    <div
    style={{ 
      "--index": index
    }}
    >

    <div className="skater group relative flex flex-col items-center">
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
        <div className="relative w-full place-self-end bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <h3 className="relative grid place-self-end justify-self-start p-2 text-brand-gray text-2xl">
          <span className="mb-[-.3em] block font-hussar">{offer.data.name}</span>
          <p className="font-variant-numeric tabular-nums">{price}</p>
        </h3>
        
      </div>
      <div className="absolute inset-0 flex -mb-14 items-end justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <ButtonLink 
        size="md"
        icon="cart"
        color="purple"
        field={offer.data.button}><span className="font-mono whitespace-nowrap">BOOK NOW</span></ButtonLink>
      </div>
      {/* <div className="relative inset-0 flex items-end h-full justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">

      <button className="flex justify-center gap-2 font-hussar items-center mx-auto shadow-xl text-base sm:text-lg bg-brand-logo hover:bg-brand-pink backdrop-blur-md font-medium lg:font-semibold text-white relative z-10 px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 overflow-hidden border-2 border-white/20 rounded-full transition-all duration-300 hover:scale-105 [text-shadow:1px_1px_2px_rgba(0,0,0,0.3)]">
        <PrismicNextLink field={offer.data.button}
          className="w-full h-full block">
            <span className="whitespace-nowrap">Book Now</span>
        </PrismicNextLink>
      </button>
      </div> */}
      
      
    </div>
    </div>

  );
}