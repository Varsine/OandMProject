import React from 'react';
import Slider from 'react-slick';

import { worksCards } from 'utils/index';

import Slide from './Slide';
import styles from './OurWorks.scss';
import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';

const OurWorks = () => {
  const settings = {
    fade: true,
    dots: false,
    speed: 700,
    infinite: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    className: styles.slider,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const renderSlides = worksCards.map((item) => (
    <Slide key={item.id} data={item} />
  ));

  return (
    <section className="section">
      <div className="canvas__working" />
      <div className={styles.wrapper}>
        <Slider {...settings}>{renderSlides}</Slider>
      </div>
    </section>
  );
};

export default OurWorks;
