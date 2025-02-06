'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { imageOptimizer } from 'next/dist/server/image-optimizer';

const SwiperSlider = ({ images }: { images: any }) => (
  <Swiper
    modules={[Navigation, Pagination, Autoplay]}
    spaceBetween={10}
    slidesPerView={1}
    loop={true}
    dir={'rtl'}
    autoplay={{
      delay: 6000,
      pauseOnMouseEnter: true,
      reverseDirection: true
    }}
    navigation
    pagination={{ clickable: true }}
  > {
      images.map((image: any, index: number) => (
        <SwiperSlide key={index}>
          <figure className={image?.props?.className ? image.props.className : ''}>
            <img
              src={image?.props?.children[0].props.src || image?.attributes?.url}
              alt={image?.props?.children[0].props.alt || image?.attributes?.alt || image?.attributes?.title}
              className="w-full h-auto max-h-[400px]"
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
);

export default SwiperSlider;