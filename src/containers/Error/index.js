import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { paths } from 'routes/index';
import { NextLink } from 'components/index';

import styles from './Error.scss';

const ErrorContainer = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 10000, min: 0 },
      items: 1,
    },
  };

  const setting = {
    arrows: false,
    showDots: true,
    infinite: true,
    autoPlay: false,
    draggable: false,
    responsive,
    slidesToSlide: 1,
    keyBoardControl: true,
    ssr: typeof window === 'undefined',
  };

  // const renderCarouselList = worksCards.map(({ id, title }) => (
  //   <div key={id}>{title}</div>
  // ));

  return (
    <div className={styles.container} {...setting}>
      <Carousel responsive={responsive}>
        <div>s</div>
        <div>s</div>
        <div>s</div>
        <div>s</div>
        <div>s</div>
      </Carousel>
      <h1>404</h1>
      <NextLink to={paths.home}>Главная страница</NextLink>
    </div>
  );
};

export default ErrorContainer;
