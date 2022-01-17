import React from 'react';
import Carousel from 'react-multi-carousel';

import { teamCards } from 'utils/index';
import { SliderArrows } from 'components/index';

import Slide from './Slide';
import styles from './OurTeam.scss';

const OurTeam = () => {
  const renderSliderList = teamCards.map((item) => (
    <Slide key={item.id} slide={item} />
  ));

  const responsive = {
    desktop: {
      breakpoint: { max: 10000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 0 },
      items: 1,
    },
  };

  const renderCarousel = (
    <Carousel
      ssr
      infinite
      autoPlay
      arrows={false}
      keyBoardControl
      responsive={responsive}
      sliderClass={styles.carousel__container}
      containerClass={styles.carousel__wrapper}
      customButtonGroup={<SliderArrows arrowStyles={styles.arrow_style} />}
    >
      {renderSliderList}
    </Carousel>
  );

  return (
    <section
      className={`section ${styles.container} ${styles.height_response}`}
    >
      <div className="canvas__working" />
      <div className={`container ${styles.wrapper}`}>
        <h2 className={styles.title}>Our Team</h2>
        <div className={styles.carousel}>{renderCarousel} </div>
      </div>
    </section>
  );
};

export default OurTeam;
