'use client'

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
    options
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
    <Swiper
      dir={DIRECTION}
      modules={modules}
      spaceBetween={10}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: options?.autoplay?.delay || DEFAULT_DELAY,
        pauseOnMouseEnter: true,
        reverseDirection: true
      }}
      navigation={options?.hasNavigation || false}
      pagination={{ clickable: true }}
      className="h-auto flex"
    > {
        images.map((image: any, index: number) => (
          <SwiperSlide key={index} className="w-auto h-full object-cover mx-0">
            <figure className="h-full flex">
              <img
                src={image?.props?.children[0].props.src || image?.attributes?.url}
                alt={image?.props?.children[0].props.alt || image?.attributes?.alt || image?.attributes?.title}
                className="w-auto min-w-full h-full"
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
        ))}
    </Swiper>
  )
};

export default SwiperSlider;