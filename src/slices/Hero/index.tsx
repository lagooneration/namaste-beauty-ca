"use client";
import { useRef } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { ButtonLink } from "@/components/ButtonLink";
import { WideLogo } from "./WideLogo";
import { TallLogo } from "./TallLogo";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import clsx from "clsx";
import { InteractiveModel } from "./InteractiveModel";

gsap.registerPlugin(useGSAP);

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const container = useRef(null);

  useGSAP(() => {
    // Split and animate the heading text
    const heading = new SplitType(".hero-heading", { 
      types: "lines,words",
      tagName: "div",
      lineClass: "heading-line",
      wordClass: "heading-word"
    });

    // Split and animate the body text
    const bodyText = new SplitType(".hero-body", { 
      types: "lines",
      tagName: "div",
      lineClass: "line"
    });

    // Set initial states
    gsap.set(".hero-heading .heading-line", {
      overflow: "hidden",
    });

    // Set will-change using DOM
    const headingWords = document.querySelectorAll(".hero-heading .heading-word");
    headingWords.forEach(word => {
      (word as HTMLElement).style.willChange = "transform";
    });

    gsap.set(".hero-heading .heading-word", {
      y: "100%",
      opacity: 0,
      rotateX: -80,
      transformOrigin: "0% 50% -100"
    });

    gsap.set(".hero-body .line", {
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      opacity: 0,
      y: 50
    });
    
    // Create timeline for sequential animations
    const tl = gsap.timeline({
      defaults: { ease: "power4.out" }
    });

    // Animate heading first
    tl.to(".hero-heading .heading-word", {
      y: "0%",
      opacity: 1,
      rotateX: 0,
      duration: 1.2,
      stagger: 0.08
    })
    // Then animate body text
    .to(".hero-body .line", {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.05
    }, "-=0.5"); // Start body animation before heading finishes

    return () => {
      if (heading) heading.revert();
      if (bodyText) bodyText.revert();
    };
  }, { scope: container });

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative h-dvh overflow-hidden text-zinc-800 bg-brand-pink"
    > 
    <div ref={container} className="hero">
      <div
        className={clsx(
          "flex flex-col items-center gap-8 text-center md:items-start md:text-left bg-texture",
          slice.variation === "otherVariation" && "text-brand-purple "
        )}
        >
          {/* <div className="absolute inset-0 flex items-center pt-20"> */}
    <div 
      className={clsx(
          "absolute inset-0 flex items-center pt-20",
          slice.variation === "otherVariation" && "opacity-50"
        )}
        >
        <WideLogo className="w-full text-brand-purple hidden opacity-20 mix-blend-multiply lg:block" />
        <TallLogo className="w-full text-brand-purple opacity-20 mix-blend-multiply lg:hidden" />
      </div>


    <div className="absolute inset-0 mx-auto mt-24 grid max-w-6xl grid-rows-[1fr,auto] place-items-end px-6 ~py-10/16">
        <Heading className="hero-heading relative max-w-2xl place-self-start text-brand-logo mt-12">
          <div><PrismicText field={slice.primary.heading} /></div>
        </Heading>
        <div className="flex relative w-full flex-col items-center justify-between ~gap-2/4 lg:flex-row">
          <div className="hero-body max-w-[45ch] ~text-lg/xl font-mono">
            <PrismicRichText field={slice.primary.body} />
          </div>
          <ButtonLink
            field={slice.primary.button}
            icon="cart"
            size="lg"
            className="z-20 mt-2 block"
            color="logo"
          >
            {slice.primary.button.text}
          </ButtonLink>
        </div>
      </div>

      
      </div>
      </div>
      
      <InteractiveModel />
    </Bounded>
  );
};

export default Hero;
