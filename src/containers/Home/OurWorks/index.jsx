import React from 'react';
import Slider from 'react-slick';
import classNames from 'classnames';

import { worksCards } from 'utils/index';

import Slide from './Slide';
import Arrows from './Arrows';
import styles from './OurWorks.scss';

const OurWorks = () => {
  const settings = {
    fade: true,
    dots: true,
    speed: 700,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 6000,
    adaptiveHeight: false,
    nextArrow: <Arrows type="next" />,
    prevArrow: <Arrows type="prev" />,
    className: `slick__container ${styles.slider}`,
    // nextArrow: false,
    // prevArrow: false,
  };

  const renderSlides = worksCards.map((item) => (
    <Slide key={item.id} data={item} />
  ));

  return (
    <section className={classNames('section', styles.works_section)}>
      <div className="canvas__working" />
      <div className={`${styles.wrapper} container`}>
        <Slider {...settings}>{renderSlides}</Slider>
      </div>
    </section>
  );
};

export default OurWorks;
