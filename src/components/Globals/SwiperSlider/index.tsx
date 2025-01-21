'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'; 

const Gallery = ({ images }: { images: any }) => (
  <Swiper
    spaceBetween={10}
    slidesPerView={1}
    navigation
    pagination={{ clickable: true }} > {
      images.map((image: any, index: number) => (
        <SwiperSlide key={index}>
          <figure className={image.props.className}>
            <img
              src={image.props.children[0].props.src}
              alt={image.props.children[0].props.alt}
              className="w-full h-auto rounded-lg"
              width={
                image.props.children[0].props.width
              }
              height={
                image.props.children[0].props.height
              }
              loading="lazy"
              srcSet={
                image.props.children[0].props.srcSet
              }
              sizes={
                image.props.children[0].props.sizes
              }
            />
          </figure>
        </SwiperSlide>
      ))}
  </Swiper>
);

export default Gallery;