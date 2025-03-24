import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import { ButtonLink } from "@/components/ButtonLink";
import { Heading } from "@/components/Heading";
import { SlideIn } from "@/components/SlideIn";
import { ParallaxImage } from "@/slices/TextAndImage/ParallaxImage";
import { Addon } from "@/slices/TextAndImage/Addon";
import { JSX } from "react";
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
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={clsx(
        "px-6 ~py-10/16 [.header+&]:pt-44 [.header+&]:md:pt-32 sticky top-[calc(var(--index)*2rem)]",
        theme === "Dark Pink" && "bg-texture bg-brand-logo text-white",
        theme === "Light Pink" && "bg-texture bg-brand-pink text-brand-purple",
      )}
      style={{ "--index": index } as React.CSSProperties}
    >
      <div className="mx-auto w-full max-w-6xl grid grid-cols-1 items-center scale-95 gap-12 md:grid-cols-2 md:gap-24">
      <div 
          className={clsx(
            "w-full",
            slice.variation === "imageOnLeft" && "md:order-1 scale-95"
          )}>
          <ParallaxImage
            foregroundImage={slice.primary.foreground_image}
            backgroundImage={slice.primary.background_image}
          />
        </div>
        <div
          className={clsx(
            "flex flex-col items-center gap-8 text-center md:items-start md:text-left",
            slice.variation === "imageOnLeft" && "md:order-2"
          )}
        >
          <SlideIn>
            <Heading size="lg" as="h2">
              {slice.primary.heading}
            </Heading>
          </SlideIn>
          {/* <SlideIn>
            <div className="max-w-md text-lg leading-relaxed">
              {slice.primary.body}
            </div>
          </SlideIn> */}
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
        
      </div>
    </section>
  );
};

export default TextAndImage;
