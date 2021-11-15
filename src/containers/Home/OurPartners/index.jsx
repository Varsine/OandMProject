import React, { useState, useMemo } from 'react';
import Carousel from 'react-multi-carousel';

import { useWindowSize } from 'hooks/index';
import { ourPartnersCards } from 'utils/index';
import { SliderArrows, NextLink } from 'components/index';

import Slide from './Slide';
import styles from './OurPartners.scss';

const OurPartners = () => {
  const { isLaptop } = useWindowSize();
  const [activeIndex, setActiveIndex] = useState(2);

  const renderSliderList = useMemo(
    () =>
      ourPartnersCards.map((item, index) =>
        item.href ? (
          <NextLink
            anchorProps={{
              target: '_blank',
            }}
            key={item.id}
            to={item.href}
          >
            <Slide slide={item} isActive={index === activeIndex} />
          </NextLink>
        ) : (
          <Slide key={item.id} slide={item} isActive={index === activeIndex} />
        ),
      ),
    [activeIndex],
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

  const handleBeforeChange = (nextSlide) => {
    setActiveIndex(nextSlide + 1);
  };

  const memoizedCarousel = useMemo(
    () =>
      !isLaptop ? (
        <Carousel
          ssr
          infinite
          autoPlay
          arrows={false}
          swipeable={false}
          draggable={false}
          autoPlaySpeed={3000}
          responsive={responsive}
          customButtonGroup={
            <SliderArrows arrowStyles={styles.arrow_container} />
          }
          containerClass={styles.carousel__wrapper}
          beforeChange={handleBeforeChange}
        >
          {renderSliderList}
        </Carousel>
      ) : (
        <div className={styles.carousel__list}>{renderSliderList}</div>
      ),
    [isLaptop, renderSliderList],
  );

  return (
    <section className={`section ${styles.container}`}>
      <div className="canvas__working" />
      <div className={`container ${styles.wrapper}`}>
        <h2 className={styles.title}>Our Partners</h2>
        <div className={styles.carousel}>{memoizedCarousel}</div>
      </div>
    </section>
  );
};

export default OurPartners;
