import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

// import { worksCards } from 'utils/index';

import styles from './OurWorks.scss';

const OurWorks = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 10000, min: 0 },
      items: 1,
    },
  };

  // const setting = {
  //   arrows: false,
  //   showDots: true,
  //   infinite: true,
  //   autoPlay: false,
  //   draggable: false,
  //   responsive,
  //   slidesToSlide: 1,
  //   keyBoardControl: true,
  //   ssr: typeof window === 'undefined',
  // };

  // const renderCarouselList = worksCards.map(({ id, title }) => (
  //   <div key={id}>{title}</div>
  // ));

  return (
    <section className="section">
      <div className="canvas__working" />
      <div className={styles.wrapper}>
        <Carousel responsive={responsive}>
          <div>s</div>
          <div>s</div>
          <div>s</div>
          <div>s</div>
          <div>s</div>
        </Carousel>
      </div>
    </section>
  );
};

export default OurWorks;
