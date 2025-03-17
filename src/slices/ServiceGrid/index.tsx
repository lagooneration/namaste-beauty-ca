import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { SlideIn } from "@/components/SlideIn";
import { Heading } from "@/components/Heading";
import { Addon } from "./Addon";

/**
 * Props for `ServiceGrid`.
 */
export type ServiceGridProps = SliceComponentProps<Content.ServiceGridSlice>;

/**
 * Component for "ServiceGrid" Slices.
 */
const ServiceGrid: FC<ServiceGridProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-texture bg-brand-gray"
    >
      <SlideIn>
        <Heading className="text-center ~mb-4/6 text-brand-logo" as="h2">
          <PrismicText field={slice.primary.heading} />
        </Heading>
      </SlideIn>
      <SlideIn>
        <div className="text-center ~mb-6/10">
          <PrismicRichText field={slice.primary.body} />
        </div>
      </SlideIn>
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
    {slice.primary.list.map(
      ({ services }) =>
        isFilled.contentRelationship(services) && (
          <Addon key={services.id} id={services.id} />
        )
    )}
    </div>
  </Bounded>
  );
};

export default ServiceGrid;
