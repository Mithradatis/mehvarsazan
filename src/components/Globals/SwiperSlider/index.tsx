'use client'

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { SwiperModule } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { imageOptimizer } from 'next/dist/server/image-optimizer';

const SwiperSlider = (
  {
    images,
    options,
    ...rest
  }: {
    images: any,
    options?: any
  }
) => {
  const DEFAULT_DELAY = 6000;
  const DIRECTION = 'rtl';
  const modules: SwiperModule[] = [];
  options?.modules?.hasNavigation && modules.push(Navigation);
  options?.modules?.hasPagination && modules.push(Pagination);
  options?.autoplay?.delay && modules.push(Autoplay);

  return (
    <>
      {
        options?.externalNavigationButtons &&
        <>
          <button className="
            swiper-button-prev-custom 
            flex
            items-center
            justify-center
            absolute 
            left-[-50px] 
            top-1/2 
            transform 
            -translate-y-1/2 
            z-10 
            bg-gray-200 
            w-[30px]
            h-[30px] 
            rounded-full"
          >
            <FaChevronLeft className="ms-[2px]" />
          </button>
          <button className="
            swiper-button-next-custom 
            flex
            items-center
            justify-center
            absolute 
            right-[-50px] 
            top-1/2 transform 
            -translate-y-1/2 
            z-10 
            bg-gray-200 
            w-[30px]
            h-[30px] 
            rounded-full"
          >
            <FaChevronRight className="me-[2px]" />
          </button>
        </>
      }
      <Swiper
        {...rest}
        dir={DIRECTION}
        modules={modules}
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        initialSlide={options?.initialSlide || 0}
        autoplay={{
          delay: options?.autoplay?.delay || DEFAULT_DELAY,
          pauseOnMouseEnter: true,
          reverseDirection: true
        }}
        navigation={
          options?.modules?.hasNavigation && (
            options?.externalNavigationButtons
              ? { 
                  prevEl: '.swiper-button-prev-custom', 
                  nextEl: '.swiper-button-next-custom' 
              }
              : true
          )
        }
        pagination={{ clickable: true }}
        className="h-auto flex max-h-[85vh]"
      >
        {
          images.map((image: any, index: number) => (
            <SwiperSlide key={index} className="w-full h-auto object-cover mx-0">
              <figure className="h-full lg:h-auto flex">
                <img
                  src={image?.props?.children[0].props.src || image?.attributes?.url}
                  alt={image?.props?.children[0].props.alt || image?.attributes?.alt || image?.attributes?.title}
                  className="w-full h-auto"
                  width={
                    image?.props?.children[0].props.width || '100%'
                  }
                  height={
                    image?.props?.children[0].props.height || 'auto'
                  }
                  loading="lazy"
                  srcSet={
                    image?.props?.children[0].props.srcSet || []
                  }
                  sizes={
                    image?.props?.children[0].props.sizes || []
                  }
                />
              </figure>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </>
  )
};

export default SwiperSlider;