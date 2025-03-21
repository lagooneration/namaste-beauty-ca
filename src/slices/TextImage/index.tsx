import { Content, isFilled } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import clsx from "clsx";

import { Bounded } from "@/components/Bounded";
import { ButtonLink } from "@/components/ButtonLink";
import { Heading } from "@/components/Heading";
import { SlideIn } from "@/components/SlideIn";
import { ParallaxImage } from "@/slices/TextImage/ParallaxImage";
import { Addon } from "@/slices/TextAndImage/Addon";

declare module "react" {
  interface CSSProperties {
    "--index"?: number;
  }
}

/**
 * Props for `TextImage`.
 */
export type TextImageProps = SliceComponentProps<Content.TextImageSlice>;

/**
 * Component for "TextAndImage" Slices.
 */
const TextImage = ({ slice, index }: TextImageProps): JSX.Element => {
  const theme = slice.primary.theme;
  




  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={clsx(
        "sticky top-[calc(var(--index)*2rem)]",
        theme === "Dark Pink" && "bg-brand-block-one text-white bg-[url('/images/makeup-1.png')] bg-cover bg-center bg-no-repeat",
        theme === "Dark Amber" && " bg-brand-block-two text-white",
        theme === "Light Pink" && "bg-brand-block-three text-white",
        theme === "Light Amber" && "bg-brand-block-four text-white"

      )}
      style={{ "--index": index }}
    >
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-24">
        <div
          className={clsx(
            "flex flex-col items-center gap-8 text-center md:items-start md:text-left",
            slice.variation === "imageOnLeft" && "md:order-2 text-brand-purple"
          )}
        >
        {/* <div className="flex flex-col items-center gap-8 text-center md:items-start md:text-left"> */}
          <SlideIn>

            {/* <Heading size="lg" as="h2">
              <PrismicText field={slice.primary.heading} />
            </Heading> */}
            <div className="text-brand-purple font-hussar ~text-4xl/7xl">
              {/* <h2 className="text-brand-purple font-hussar ~text-4xl/7xl">
                </h2> */}
                {slice.primary.heading}
            </div>
          </SlideIn>
          <SlideIn>
            <div className="max-w-md text-lg leading-relaxed">
              {/* <PrismicRichText field={slice.primary.body} /> */}
              {slice.primary.body}
            </div>
          </SlideIn>
          <SlideIn>    
          {slice.primary.options.map(
            ({ services }) =>
              isFilled.contentRelationship(services) && (
                <Addon key={services.id} id={services.id} />
              )
            )}
          </SlideIn>
          
          <SlideIn>
            <ButtonLink
              field={slice.primary.button}
              color={theme === "Dark Pink" ? "logo" : "purple"}
            >
              {slice.primary.button.text}
            </ButtonLink>
          </SlideIn>
        </div>
        <div className="w-full">
        <ParallaxImage
          foregroundImage={slice.primary.foreground_image}
          backgroundImage={slice.primary.background_image}
          />
          </div>
      </div>
    </Bounded>
  );
};

export default TextImage;
