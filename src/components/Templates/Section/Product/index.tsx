'use client'

import Image from "next/image";
import ProductsVideoThumbnail from "@/assets/images/products-video.png";
import { useModal } from "@/hooks/useModal";
import BeveledLabel from "@/components/Globals/BeveledLabel";
import { motion } from "motion/react";
import { LanguageType } from "@/types/language";
import Translation from "@/types/translation";

const Product = (
    { 
        language, 
        translation 
    }: { 
        language: LanguageType, 
        translation: Translation 
    }
) => {
    const { handleOpen } = useModal();
    const pathLength = 100;

    return <section
        dir="rtl"
        id="product"
        className="
            relative
            bg-gradient-to-b 
            from-transparent 
            via-transparent 
            to-gray-100
        "
    >
        <div className="2xl:container mx-auto relative px-4">
            <div className="
                relative 
                block 
                lg:items-stretch 
                lg:justify-between 
                justify-center 
                has-connection"
            >
                <div className={`
                    relative 
                    top-0 
                    start-0 
                    2xl:w-1/2 
                    mx-auto 
                    text-center
                    ${language === 'fa' ? '2xl:float-start' : '2xl:float-end'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 250" className="hidden 2xl:block">
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
                        2xl:absolute
                        2xl:top-[122px]
                        2xl:right-[166.5px]
                        2xl:rotate-90
                        2xl:bg-white
                        2xl:py-0
                        px-6
                        text-2xl
                        font-bold
                        2xl:border-l-[3.5px] 
                        2xl:border-r-[3.5px] 
                        2xl:border-[#7fc1e4]
                        mb-6
                    ">
                        <BeveledLabel
                            label={translation.products}
                            fontSize={2}
                            extraClasses="z-10"
                        />
                    </h3>
                </div>
                <div className="
                    2xl:absolute 
                    relative 
                    flex-1 
                    flex 
                    items-center 
                    justify-center 
                    z-10 
                    2xl:py-24 
                    pt-4
                    pb-12
                    mx-auto 
                    end-0 
                    start-0"
                >
                    <Image
                        className="min-w-3/4 md:min-w-[350px] xl:w-[350px] mx-auto"
                        src={ProductsVideoThumbnail}
                        alt={"Products"}
                    />
                    <div
                        className="play absolute cursor-pointer"
                        onClick={() => handleOpen(
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
                        )}
                    >
                        <span className="play-icon"></span>
                        <span className="play-icon-1"></span>
                    </div>
                </div>
                <div className={`
                    relative 
                    bottom-0 
                    end-0 
                    2xl:w-1/2 
                    text-center
                    ${language === 'fa' ? '2xl:float-end' : '2xl:float-start'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 250" className="hidden 2xl:block">
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
                    <h3 className={`
                        text-center
                        md:inline-flex
                        2xl:absolute
                        2xl:-rotate-90
                        2xl:bg-gradient-to-r
                        2xl:from-[#f3f4f6]
                        2xl:to-[#f9f9fa]
                        2xl:py-0
                        px-6
                        text-2xl
                        font-bold
                        2xl:border-l-[3.5px] 
                        2xl:border-r-[3.5px] 
                        2xl:border-[#7fc1e4]
                        pb-6
                        ${language === 'fa' ? '2xl:left-[98px] 2xl:bottom-[58px]' : '2xl:left-[85px] 2xl:bottom-[75px]'}
                    `}>
                        <BeveledLabel
                            label={translation.services}
                            fontSize={2}
                        />
                    </h3>
                </div>
            </div>
            <div className="clearfix"></div>
        </div>
    </section>
}

export default Product;