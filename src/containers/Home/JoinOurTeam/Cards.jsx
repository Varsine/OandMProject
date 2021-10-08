import React, { useMemo } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, EffectCube, Pagination } from 'swiper';

import { modeSelector } from 'slices/mainSlice';

import './styles.css';

const Cards = () => {
  SwiperCore.use([Autoplay, EffectCube, Pagination]);

  const isDarkMode = useSelector(modeSelector);

  const cube = useMemo(
    () =>
      classNames({
        text: isDarkMode,
        light_text: !isDarkMode,
      }),
    [isDarkMode],
  );

  return (
    <Swiper
      loop
      grabCursor
      effect="cube"
      cubeEffect={{
        shadow: false,
        slideShadows: false,
      }}
      pagination={false}
      autoplay={{
        delay: 1500,
        disableOnInteraction: false,
      }}
    >
      <SwiperSlide>
        <div className="swiperr_image" />
        <p className={cube}>Fun and creative staff</p>
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiperr_image" />
        <p className={cube}>Friendship</p>
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiperr_image" />
        <p className={cube}>Music for everyone</p>
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiperr_image" />
        <p className={cube}>Best Coffee for work</p>
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiperr_image" />
        <p className={cube}>Work comfortably</p>
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiperr_image" />
        <p className={cube}>Happy working day</p>
      </SwiperSlide>
    </Swiper>
  );
};

export default Cards;
