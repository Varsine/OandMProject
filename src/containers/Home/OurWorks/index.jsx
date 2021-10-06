import React from 'react';
import Slider from 'react-slick';
import classNames from 'classnames';

import { worksCards } from 'utils/index';

import Slide from './Slide';
import styles from './OurWorks.scss';
import Arrows from './Arrows';

const OurWorks = () => {
  const settings = {
    fade: true,
    dots: false,
    speed: 700,
    infinite: true,
    nextArrow: <Arrows type="next" />,
    prevArrow: <Arrows type="prev" />,
    className: styles.slider,
    slidesToShow: 1,
    slidesToScroll: 1,
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
