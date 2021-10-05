import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectCube, Pagination } from 'swiper';

import { swiperSlides } from './constants';

import './styles.css';

const Cards = () => {
  SwiperCore.use([EffectCube, Pagination]);

  const swipeSlideRenderer = () => {
    return swiperSlides.map(({ id, text }) => {
      return (
        <SwiperSlide key={id}>
          <div className="swiper_image" />
          <p className="text">{text}</p>
        </SwiperSlide>
      );
    });
  };

  return (
    <Swiper
      effect="cube"
      grabCursor
      loop
      cubeEffect={{
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      }}
      pagination={false}
    >
      {swipeSlideRenderer()}
    </Swiper>
  );
};

export default Cards;
