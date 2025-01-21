'use cient'

import Image from "next/image";
import ProductsVideoThumbnail from "@/assets/images/products-video.png";
import useModal from "@/hooks/useModal";

const Product = () => {
    const { setIsOpen } = useModal(); 

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
        <div className="container mx-auto relative">
            <div className="relative block items-stretch justify-between has-connection">
                <div className="relative top-0 right-0 float-start w-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 250">
                        <defs>
                            <path id="path1" strokeWidth="2" strokeLinecap="round"
                                d="
                            M 230 0
                            V 115
                            Q 230 125 222.5 125
                            H 80"
                            />
                            <mask id="mask1">
                                <use className="mask" xlinkHref="#path1" />
                            </mask>
                        </defs>
                        <use className="path" xlinkHref="#path1" mask="url(#mask1)" />
                    </svg>
                    <h3 className="
                        inline-flex
                        absolute
                        top-[122px]
                        right-[187.5px]
                        rotate-90
                        bg-white
                        py-0
                        px-6
                        text-2xl
                        font-bold
                        border-l-[3.5px] 
                        border-r-[3.5px] 
                        border-[#7fc1e4]
                    ">محصولات</h3>
                </div>
                <div className="absolute flex-1 flex items-center justify-center z-10 py-24 mx-auto left-0 right-0">
                    <Image
                        className="w-[350px] min-w-[350px]"
                        src={ProductsVideoThumbnail}
                        alt={"Products"}
                    />
                    <div className="play absolute">
                        <span className="play-icon"></span>
                        <span className="play-icon-1"></span>
                    </div>
                </div>
                <div className="relative bottom-0 left-0 float-end w-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 250">
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
                        inline-flex
                        absolute
                        bottom-[60px]
                        left-[115px]
                        rotate-[-90deg]
                        bg-gradient-to-r
                        from-[#f3f4f6]
                        to-[#f9f9fa]
                        py-0
                        px-6
                        text-2xl
                        font-bold
                        border-l-[3.5px] 
                        border-r-[3.5px] 
                        border-[#7fc1e4]
                    ">خدمات</h3>
                </div>
            </div>
            <div className="clearfix"></div>
        </div>
    </section>
}

export default Product;