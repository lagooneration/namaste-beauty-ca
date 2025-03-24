"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { StaticMap } from "@/components/StaticMap";

/**
 * Props for `MapsLocation`.
 */
export type MapsLocationProps = SliceComponentProps<Content.MapsLocationSlice>;

/**
 * Component for "MapsLocation" Slices.
 */
const MapsLocation = ({ slice }: MapsLocationProps) => {
  // Get coordinates from slice or use defaults
  const latitude = slice.primary.lat ?? 49.219490;
  const longitude = slice.primary.lon ?? -122.598780;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="px-6 ~py-10/16 [.header+&]:pt-44 [.header+&]:md:pt-32 bg-brand-gray py-20"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-3xl font-sans font-bold text-brand-logo">Visit Us</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-hussar font-semibold text-brand-purple">Address</h3>
                <p className="text-brand-purple font-mono">
                  {slice.primary.address || "330-22709 Lougheed Highway, Maple Ridge"}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-hussar font-semibold text-brand-purple">Hours</h3>
                <p className="text-brand-purple font-mono whitespace-pre-line">
                  {slice.primary.hours || "Monday - Friday: 9AM - 6PM\nSaturday: 10AM - 4PM\nSunday: Closed"}
                </p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="relative md:h-[308px] h-[220px]">
            <StaticMap
              latitude={latitude}
              longitude={longitude}
              zoom={15}
              width={800}
              height={400}
              markerColor="red"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MapsLocation;