import React, { useState, useMemo } from 'react';
import Carousel from 'react-multi-carousel';

import { teamCards } from 'utils/index';
import { SliderArrows } from 'components/index';

import Slide from './Slide';
import styles from './OurTeam.scss';

const OurTeam = () => {
  const [activeIndex, setActiveIndex] = useState(2);

  const renderSliderList = useMemo(
    () =>
      teamCards.map((item, index) => (
        <Slide key={item.id} slide={item} isActive={index === activeIndex} />
      )),
    [teamCards, activeIndex],
  );

  const responsive = {
    desktop: {
      breakpoint: { max: 10000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 0 },
      items: 1,
    },
  };

  const setting = {
    ssr: true,
    responsive,
    arrows: false,
    infinite: true,
    autoPlay: false,
    draggable: false,
    swipeable: false,
    sliderClass: styles.carousel__container,
    containerClass: styles.carousel__wrapper,
    customButtonGroup: <SliderArrows arrowStyles={styles.arrow_style} />,
    beforeChange: (nextSlide) => {
      setActiveIndex(nextSlide + 1);
    },
  };

  return (
    <section className={`section ${styles.container} ${styles.height_reponce}`}>
      <div className="canvas__working" />
      <div className={`container ${styles.wrapper}`}>
        <h2 className={styles.title}>Our Team</h2>
        <div className={styles.carousel}>
          <Carousel {...setting}>{renderSliderList}</Carousel>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
