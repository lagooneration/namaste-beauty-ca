import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { PrismicText, SliceComponentProps } from "@prismicio/react";
import React from "react";
import { Offer } from "./Offer";
import { SlideIn } from "@/components/SlideIn";

/**
 * Props for `TeamGrid`.
 */
export type OfferGridProps = SliceComponentProps<Content.OfferGridSlice>;

/**
 * Component for "TeamGrid" Slices.
 */
const OfferGrid = async ({ slice }: OfferGridProps): Promise<JSX.Element> => {
  const client = createClient();
  const offers = await client.getAllByType("offers");

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-texture bg-brand-gray"
    >
      <SlideIn>
        {/* <Heading as="h2" size="lg" className="mb-8 text-center text-brand-logo">
        </Heading> */}
          <div className="flex justify-center mt-2 font-sans text-brand-purple ~text-4xl/7xl">

          <PrismicText field={slice.primary.heading} />
          </div>
      </SlideIn>
      <div className="grid grid-cols-1 gap-0 md:grid-cols-4">
        {offers.map((offer, index) => (
          <React.Fragment key={index}>
            {offer.data.name && (
              <SlideIn>
                <Offer index={index} offer={offer} />
              </SlideIn>
            )}
          </React.Fragment>
        ))}
      </div>
    </Bounded>
  );
};

export default OfferGrid;