'use client'

import Image from "next/image";
import { useState } from "react";
import { useModal } from "@/hooks/useModal";
import Translation from "@/types/translation";
import SwiperSlider from "@/components/Globals/SwiperSlider";

const GalleryComponent = (
    {
        images,
        thumbnails,
        translation
    }: {
        images: any;
        thumbnails: any;
        translation: Translation;
    }
) => {
    const { handleOpen } = useModal();
    const [initialSlide, setInitialSlide] = useState(0);

    const getMaxWidth = (index: number) => {
        const sizes = [400, 350, 325, 375];
        return sizes[index % sizes.length];
    }

    const openSlider = (index: number) => {
        setInitialSlide(index);
        handleOpen(
            {
                title: translation.gallery,
                content: (
                    <SwiperSlider
                        images={images}
                        options={{
                            hasNavigation: true,
                            hasPagination: true,
                            autoplay: {
                                delay: 5000
                            },
                            initialSlide: index
                        }}
                    />
                )
            }
        )
    }

    return (
        <>
            {
                thumbnails && thumbnails.map((thumbnail: any, index: number) => {
                    return <div
                        key={index}
                        className={
                            `relative transition-all cursor-pointer ${index % 2 === 0
                                ? 'flex justify-end w-[calc(50%-10px)] md:w-[calc(50%-24px)]'
                                : 'flex justify-start w-[calc(50%-10px)] md:w-[calc(50%-24px)]'
                            } ${index < 2
                                ? 'self-end'
                                : 'self-start'
                            }`
                        }
                    >
                        <div 
                            className="
                                relative
                                overflow-hidden
                                rounded-2xl
                                after:block
                                after:w-full
                                after:h-full
                                after:absolute
                                after:z-10
                                after:top-0
                                after:left-0
                                after:bg-blue-400
                                after:opacity-20
                                after:rounded-2xl
                                hover:after:opacity-0
                                transition-all
                                shadow-[0_0_30px_rgba(34,34,34,.25)]
                            "
                            onClick={() => openSlider(index)}
                        >
                            <Image
                                width={thumbnail.width}
                                height={thumbnail.height}
                                src={thumbnail.url}
                                alt={thumbnail.alt || 'Gallery Image'}
                                quality={100}
                                style={{ width: `${getMaxWidth(index)}px` }}
                            />
                        </div>
                    </div>
                })
            }
        </>
    )
}

export default GalleryComponent;
