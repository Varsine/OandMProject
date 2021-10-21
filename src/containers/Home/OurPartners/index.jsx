import React, { useState, useMemo } from 'react';
import Carousel from 'react-multi-carousel';

import { useWindowSize } from 'hooks/index';
import { ourPartnersCards } from 'utils/index';
import { SliderArrows } from 'components/index';

import Slide from './Slide';
import styles from './OurPartners.scss';

const OurPartners = () => {
  const { isLaptop } = useWindowSize();
  const [activeIndex, setActiveIndex] = useState(2);

  const renderSliderList = useMemo(
    () =>
      ourPartnersCards
        .slice(isLaptop ? 1 : 0, ourPartnersCards.length)
        .map((item, index) => (
          <Slide key={item.id} slide={item} isActive={index === activeIndex} />
        )),
    [ourPartnersCards, activeIndex, isLaptop],
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
    autoPlay: true,
    draggable: false,
    swipeable: false,
    customButtonGroup: <SliderArrows arrowStyles={styles.arrow_container} />,
    containerClass: styles.carousel__wrapper,
    beforeChange: (nextSlide) => {
      setActiveIndex(nextSlide + 1);
    },
  };

  return (
    <section className={`section ${styles.container}`}>
      <div className="canvas__working" />
      <div className={`${styles.wrapper} container`}>
        <h2 className={styles.title}>Our Partners</h2>
        <div className={styles.carousel}>
          {!isLaptop ? (
            <Carousel {...setting}>{renderSliderList}</Carousel>
          ) : (
            <div className={styles.carousel__list}>{renderSliderList}</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OurPartners;
