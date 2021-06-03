import React, { useState } from 'react';

import Slide from './Slide/index';
import styles from './OurTeam.scss';

import { ArrowIcon } from '../../icons';

const OurTeam = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const incrementSlideHandler = () => {
    setActiveIndex(activeIndex + 1);
  };

  const decrementSlideHandler = () => {
    setActiveIndex(activeIndex - 1);
  };

  return (
    <section className="section">
      <div className="canvas__working" />
      <div className={styles.wrapper}>
        <Slide activeIndex={activeIndex} />
        <div className={styles.arrows}>
          <ArrowIcon
            className={styles.arrows__left}
            onClick={decrementSlideHandler}
          />
          <ArrowIcon
            className={styles.arrows__right}
            onClick={incrementSlideHandler}
          />
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
