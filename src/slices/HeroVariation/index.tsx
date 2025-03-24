"use client";
import { useRef } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { ButtonLink } from "@/components/ButtonLink";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { useEffect } from "react";
import { HeroCard } from "@/components/HeroCard";
import ImageScroll from "@/components/ImageScroll";
import GlassCards from "@/components/GlassCards";

gsap.registerPlugin(useGSAP);

/**
 * Props for `Hero`.
 */
export type HeroVariationProps = SliceComponentProps<Content.HeroVariationSlice>;

/**
 * Component for "Hero" Slices.
 */
const HeroVariation = ({ slice }: HeroVariationProps): JSX.Element => {
  const container = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  useEffect(() => {
    const handleResize = () => {
      if (videoRef.current) {
        const video = videoRef.current;
        const videoRatio = video.videoWidth / video.videoHeight;
        const windowRatio = window.innerWidth / window.innerHeight;

        if (window.innerWidth <= 768) { // Mobile view
          video.style.width = '100vw';
          video.style.height = '100vh';
          video.style.objectFit = 'cover';
          video.style.objectPosition = 'center center';
        } else { // Desktop view
          if (windowRatio > videoRatio) {
            video.style.width = '100vw';
            video.style.height = 'auto';
          } else {
            video.style.width = 'auto';
            video.style.height = '100vh';
          }
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (  
    
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative h-dvh overflow-hidden text-zinc-800 bg-none"
    > 
    {/* Background Video */}
    <div className="absolute inset-0 -z-10">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute scale-105 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full"
          poster="/video-poster.jpg" // Add a poster image while video loads
        >
          <source src="/herovid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay to ensure text readability */}
      </div>

    <div ref={container} className="hero">
      <div
        className="flex flex-col items-center gap-8 text-center md:items-start md:text-left bg-texture">
          {/* <div className="absolute inset-0 flex items-center pt-20"> */}
    {/* <div 
      className="absolute inset-0 flex items-center pt-20">
        <WideLogo className="w-full text-brand-purple hidden opacity-20 mix-blend-multiply lg:block" />
        <TallLogo className="w-full text-brand-purple opacity-20 mix-blend-multiply lg:hidden" />
      </div> */}


    <div className="absolute inset-0 mx-auto mt-24 grid max-w-6xl grid-rows-[1fr,auto] place-items-end px-6 ~py-10/16">
    <div className="relative max-w-2xl place-self-start">
        <Heading className="hero-heading text-brand-logo/90 mt-12">
          <div><PrismicText field={slice.primary.heading} /></div>
          
        </Heading>
        <div className="hero-body text-brand-gray/60 font-mono max-w-[45ch] ~text-lg/xl">
            <PrismicRichText field={slice.primary.body} />
          </div>
    </div>
        

        <div className="flex relative w-full flex-col items-center justify-between ~gap-2/4 lg:flex-row">
          {/* <GlassCards /> */}
          <div className="flex mb-12">
          <HeroCard />
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
    </Bounded>
  );
};

export default HeroVariation;
