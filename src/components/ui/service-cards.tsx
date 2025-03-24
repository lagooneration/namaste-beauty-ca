"use client"

import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { PrismicNextImage } from "@prismicio/next";
import { ImageFieldImage } from "@prismicio/client";

type ServiceCardProps = {
  serviceName: string;
  price: number;
  discountPercentage?: number;
  description: string;
  icon: ImageFieldImage;
}

export default function ServiceCards({ serviceName, price, discountPercentage, description, icon }: ServiceCardProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className="flex flex-col w-full max-w-[260px] mx-auto">
            {/* Service Card */}
            <motion.div
                className="relative bg-white/80 filter backdrop-blur-sm rounded-md p-2 shadow-lg"
                whileHover={{ scale: 1.02 }}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="absolute -top-10 left- z-10 hover:scale-110 transition-all duration-300">
                {/* <img src="/icons/icon3.png" alt="Group" width={70} height={70} /> */}
                <PrismicNextImage field={icon} alt="" width={60} height={60} />
                </div>
                
                <div className="flex justify-between items-center mt-2">
                    <h3 className="font-hussar font-bold text-brand-purple text-base">{serviceName}</h3>
                    <div className="flex flex-col items-end">
                        <div className="absolute -top-8 right-3 z-10 hover:scale-110 transition-all duration-300">
                        {discountPercentage && (
                            <span className="text-sm text-brand-gray font-bold animate-pulse bg-red-500 rounded-full px-2 py-1">
                                {discountPercentage}% OFF
                            </span>
                        )}
                        </div>
                        <span className="text-brand-purple font-mono font-semibold">${price}</span>
                    </div>
                </div>
            </motion.div>

            {/* Animated Description */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        {/* <div className="relative -top-3 left-3 z-10">
                        </div> */}
                        <div className="bg-white/80 filter backdrop-blur-sm mt-2 p-4 rounded-md">
                            <p className="font-mono font-light text-left text-sm text-brand-purple">
                                {description}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// /**
//  * ==============   Styles   ================
//  */

// const container: React.CSSProperties = {
//     display: "flex",
//     flexDirection: "column",
//     width: 100,
//     height: 160,
//     position: "relative",
// }

// const box: React.CSSProperties = {
//     width: 100,
//     height: 100,
//     backgroundColor: "#0cdcf7",
//     borderRadius: "10px",
// }

// const button: React.CSSProperties = {
//     backgroundColor: "#0cdcf7",
//     borderRadius: "10px",
//     padding: "10px 20px",
//     color: "#0f1115",
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
// }
