import React, { useMemo } from 'react';
import shortid from 'shortid';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, EffectCube, Pagination } from 'swiper';

import { modeSelector } from 'slices/mainSlice';
import { swipeData } from 'utils';

import styles from './JoinOurTeam.scss';

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
  const renderSwipe = swipeData.map((item) => (
    <SwiperSlide key={shortid.generate()}>
      <div className="swiperr_image" />
      <p className={cube}>{item.text}</p>
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
          delay: 1500,
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
