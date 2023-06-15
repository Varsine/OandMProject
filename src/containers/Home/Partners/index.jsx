import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { Heading } from 'components/index';
import NextImage from 'components/NextImage';
import { partnersItems } from 'utils/index';

import styles from './Partners.scss';

const Partners = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const renderItems = partnersItems.map((el) => (
    <div key={el.id} className={styles.wrapper__items_content}>
      <NextImage className={styles.wrapper__img} src={el.src} />
    </div>
  ));

  return (
    <section className="section">
      <div className={`container ${styles.wrapper}`}>
        <Heading className={styles.wrapper__title} isTitle>
          Our Partners
        </Heading>
        <Carousel
          draggable={false}
          showDots
          responsive={responsive}
          ssr
          infinite
          keyBoardControl
          customTransition="all 1.5s"
          transitionDuration={1500}
          containerClass={styles.wrapper__carousel}
          removeArrowOnDeviceType={['tablet', 'mobile']}
          dotListClass={styles.wrapper__dots}
          itemClass="carousel-item-padding-40-px"
        >
          {renderItems}
        </Carousel>
      </div>
    </section>
  );
};

export default Partners;
