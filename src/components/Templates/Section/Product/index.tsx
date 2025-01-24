'use client'

import Image from "next/image";
import ProductsVideoThumbnail from "@/assets/images/products-video.png";
import { useModal } from "@/hooks/useModal";
import BeveledLabel from "@/components/Globals/BeveledLabel";
import { motion } from "motion/react";

const Product = () => {
    const { handleOpen } = useModal();
    const pathLength = 100;

    return <section
        id="product"
        className="
            relative
            bg-gradient-to-b 
            from-transparent 
            via-transparent 
            to-gray-100
        "
    >
        <div className="container mx-auto relative md:px-0 px-4">
            <div className="relative block items-stretch justify-between has-connection">
                <div className="relative top-0 right-0 md:float-start md:w-1/2 mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 250" className="hidden md:block">
                        <defs>
                            <motion.path
                                id="path1"
                                strokeWidth="2"
                                strokeLinecap="round"
                                d="M 230 0 V 115 Q 230 125 222.5 125 H 80"
                                initial={{ opacity: 0, strokeDashoffset: pathLength }}
                                whileInView={{
                                    opacity: 1,
                                    strokeDashoffset: 0,
                                    transition: {
                                        opacity: { duration: 0.5, delay: .2 },
                                        strokeDashoffset: { duration: 1, ease: "easeInOut", delay: .2 }
                                    }
                                }}
                                viewport={{ once: true, amount: 0.5 }}
                                strokeDasharray="8 4"
                            />
                            <mask id="mask1">
                                <motion.use
                                    href="#path1"
                                    className="mask"
                                    initial={{ opacity: 0, strokeDashoffset: pathLength }}
                                    whileInView={{
                                        opacity: 1,
                                        strokeDashoffset: 0,
                                        transition: {
                                            opacity: { duration: 0.5, delay: .2 },
                                            strokeDashoffset: { duration: 1, ease: "easeInOut", delay: .2 }
                                        }
                                    }}
                                    viewport={{ once: true, amount: 0.5 }}
                                />
                            </mask>
                        </defs>
                        <use className="path" href="#path1" mask="url(#mask1)" />
                    </svg>
                    <h3 className="
                        text-center
                        md:inline-flex
                        md:absolute
                        md:top-[122px]
                        md:right-[172px]
                        md:rotate-90
                        bg-white
                        md:py-0
                        px-6
                        text-2xl
                        font-bold
                        md:border-l-[3.5px] 
                        md:border-r-[3.5px] 
                        md:border-[#7fc1e4]
                        mb-6
                    ">
                        <BeveledLabel label="محصولات" fontSize={2} />
                    </h3>
                </div>
                <div className="md:absolute relative flex-1 flex items-center justify-center z-10 md:py-24 pt-0 pb-12 mx-auto left-0 right-0">
                    <Image
                        className="min-w-3/4 md:min-w-[350px] mx-auto"
                        src={ProductsVideoThumbnail}
                        alt={"Products"}
                    />
                    <div className="play absolute cursor-pointer" onClick={() => handleOpen(
                        {
                            title: "محصولات",
                            content: (
                                <video
                                    className="w-full h-full"
                                    controls
                                    autoPlay
                                >
                                    <source src={"/reera.mp4"} type="video/mp4" />
                                </video>
                            )
                        }
                    )}>
                        <span className="play-icon"></span>
                        <span className="play-icon-1"></span>
                    </div>
                </div>
                <div className="relative bottom-0 left-0 md:float-end md:w-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 250" className="hidden md:block">
                        <defs>
                            <path id="path2" strokeWidth="2" strokeLinecap="round"
                                d="M 270 125 
                                    H 87.5 
                                    Q 80 125 80 135 
                                    V 250"
                            />
                            <mask id="mask2">
                                <use className="mask" xlinkHref="#path2" />
                            </mask>
                        </defs>
                        <use className="path" xlinkHref="#path2" mask="url(#mask2)" />
                    </svg>
                    <h3 className="
                        text-center
                        md:inline-flex
                        md:absolute
                        md:bottom-[60px]
                        md:left-[102.5px]
                        md:rotate-[-90deg]
                        md:bg-gradient-to-r
                        md:from-[#f3f4f6]
                        md:to-[#f9f9fa]
                        md:py-0
                        px-6
                        text-2xl
                        font-bold
                        md:border-l-[3.5px] 
                        md:border-r-[3.5px] 
                        md:border-[#7fc1e4]
                        pb-6
                    ">
                        <BeveledLabel label="خدمات" fontSize={2} />
                    </h3>
                </div>
            </div>
            <div className="clearfix"></div>
        </div>
    </section>
}

export default Product;