import React, { useMemo, useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import { useSelector } from 'react-redux';

import { teamCards } from 'utils/index';
import { SliderArrows } from 'components/index';
import { activeIndexSelector } from 'slices/mainSlice';

import Slide from './Slide';
import styles from './OurTeam.scss';

const OurTeam = () => {
  const activeIndex = useSelector(activeIndexSelector);

  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const arrowHandler = () => {
    setIsAutoPlay(false);
  };

  useEffect(() => {
    if (activeIndex !== 6) {
      setIsAutoPlay(false);
    }
    return setIsAutoPlay(true);
  }, [isAutoPlay]);

  const renderSliderList = useMemo(
    () => teamCards.map((item) => <Slide key={item.id} slide={item} />),
    [teamCards],
  );

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

  const setting = {
    ssr: true,
    responsive,
    arrows: false,
    infinite: true,
    draggable: false,
    swipeable: false,
    afterChange: false,
    beforeChange: false,
    autoPlay: isAutoPlay,
    sliderClass: styles.carousel__container,
    containerClass: styles.carousel__wrapper,
    customButtonGroup: (
      <SliderArrows
        nextProp={arrowHandler}
        previousProp={arrowHandler}
        arrowStyles={styles.arrow_style}
      />
    ),
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
