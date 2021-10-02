import React, { useState, useMemo } from 'react';
import Carousel from 'react-multi-carousel';

import { teamCards } from 'utils/index';

import Slide from './Slide';
import styles from './OurTeam.scss';
import ButtonGroup from './ButtonGroup';

const OurTeam = () => {
  const [activeIndex, setActiveIndex] = useState(2);

  const renderSliderList = useMemo(
    () =>
      teamCards.map((item, index) => (
        <Slide
          key={item.id}
          slide={item}
          index={index}
          isActive={index === activeIndex}
        />
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
    arrows: false,
    infinite: false,
    autoPlay: false,
    draggable: false,
    responsive,
    // customTransition: 'all .5',
    containerClass: styles.carousel,
    customButtonGroup: <ButtonGroup />,
    beforeChange: (nextSlide) => {
      setActiveIndex(nextSlide + 1);
    },
  };

  return (
    <section className="section">
      <div className="canvas__working" />
      <div className={`${styles.wrapper} container`}>
        <h2 className={styles.title}>Our Team</h2>
        <div className={styles.slides}>
          <Carousel {...setting}>{renderSliderList}</Carousel>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
