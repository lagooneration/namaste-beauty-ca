import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ServiceGrid`.
 */
export type ServiceGridProps = SliceComponentProps<Content.ServiceGridSlice>;

/**
 * Component for "ServiceGrid" Slices.
 */
const ServiceGrid: FC<ServiceGridProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for service_grid (variation: {slice.variation})
      Slices
    </section>
  );
};

export default ServiceGrid;
