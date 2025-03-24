"use client"

import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { ImageFieldImage } from "@prismicio/client";
import SCard from "@/components/ui/s-card"

type ServiceCardProps = {
  serviceName: string;
  price: number;
  discountPercentage?: number;
  description: string;
  icon: ImageFieldImage;
}

export default function ServiceCard({ serviceName, price, discountPercentage, description, icon }: ServiceCardProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className="flex flex-col w-full max-w-[390px] mx-auto">
            {/* Service Card */}
            <motion.div
                className="relative bg-none filter backdrop-blur-sm rounded-md p-2 shadow-lg"
                whileHover={{ scale: 1.02 }}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <SCard 
                  serviceName={serviceName || "Service"}
                  price={price}
                  discountPercentage={discountPercentage || undefined}
                  icon={icon}
                />
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
                        <div className="bg-none filter backdrop-blur-sm mt-0 p-4 rounded-md">
                            <p className="font-mono font-light text-left text-sm text-brand-pink">
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
