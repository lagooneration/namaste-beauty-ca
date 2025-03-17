import { Content } from "@prismicio/client";
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
import { ParallaxImage } from "./ParallaxImage";

declare module "react" {
  interface CSSProperties {
    "--index"?: number;
  }
}

/**
 * Props for `TextAndImage`.
 */
export type TextAndImageProps = SliceComponentProps<Content.TextAndImageSlice>;

/**
 * Component for "TextAndImage" Slices.
 */
const TextAndImage = ({ slice, index }: TextAndImageProps): JSX.Element => {
  const theme = slice.primary.theme;
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={clsx(
        "sticky top-[calc(var(--index)*2rem)]",
        theme === "Dark Pink" && "bg-texture bg-brand-logo text-white",
        theme === "Light Pink" && "bg-texture bg-brand-pink text-white",
      )}
      style={{ "--index": index }}
    >
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-24">
        <div
          className={clsx(
            "flex flex-col items-center gap-8 text-center md:items-start md:text-left",
            slice.variation === "imageOnLeft" && "md:order-2"
          )}
        >
          <SlideIn>
            <Heading size="lg" as="h2">
              {/* <PrismicText field={slice.primary.heading} /> */}
              {slice.primary.heading}
            </Heading>
          </SlideIn>
          <SlideIn>
            <div className="max-w-md text-lg leading-relaxed">
              {/* <PrismicRichText field={slice.primary.body} /> */}
              {slice.primary.body}
            </div>
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

        <ParallaxImage
          foregroundImage={slice.primary.foreground_image}
          backgroundImage={slice.primary.background_image}
        />
      </div>
    </Bounded>
  );
};

export default TextAndImage;
