import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectCube, Pagination } from 'swiper';

import './styles.css';

const Cards = () => {
  SwiperCore.use([EffectCube, Pagination]);

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
      <SwiperSlide>
        <div className="swiperr_image" />
        <p className="text">Fun and creative staff</p>
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiperr_image" />
        <p className="text">Friendship</p>
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiperr_image" />
        <p className="text">Music for everyone</p>
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiperr_image" />
        <p className="text">Best Coffee for work</p>
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiperr_image" />
        <p className="text">Work comfortably</p>
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiperr_image" />
        <p className="text">Happy working day</p>
      </SwiperSlide>
    </Swiper>
  );
};

export default Cards;
