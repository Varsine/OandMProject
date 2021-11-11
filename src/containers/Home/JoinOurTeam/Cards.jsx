import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, EffectCube, Pagination } from 'swiper';

import { swipeData } from 'utils/index';

import styles from './JoinOurTeam.scss';

import './styles.css';

const Cards = () => {
  SwiperCore.use([Autoplay, EffectCube, Pagination]);

  const renderSwipe = swipeData.map(({ id, text }) => (
    <SwiperSlide key={id}>
      <div className="swiper_image" />
      <p className="text">{text}</p>
    </SwiperSlide>
  ));

  return (
    <div id="app" className={styles.wrapper__swiper}>
      <Swiper
        loop
        effect="cube"
        cubeEffect={{
          shadow: false,
          slideShadows: false,
        }}
        pagination={false}
        autoplay={{
          delay: 1700,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      >
        {renderSwipe}
      </Swiper>
    </div>
  );
};

export default Cards;
