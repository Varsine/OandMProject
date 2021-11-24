import React from 'react';
import { useSelector } from 'react-redux';

import { activeIndexSelector } from 'slices/mainSlice';

import HowWeWorkAnimation from './HowWeWork';
import HowWeWorkAnimationClosed from './HowWeWorkclosed';
//
import styles from './HowWeWork.scss';

const HowWeWork = () => {
  const activeIndex = useSelector(activeIndexSelector);
  const isActiveAnimate = activeIndex === 3;

  const textOne =
    "If you're offered to seat on a rocket ship, don't ask what, just seat!";

  const textTwo =
    "There's on time for regrets. You've just got to keep moving forward.";

  return (
    <section className={`${styles.height_response} ${styles.we_work} section`}>
      <div className="canvas__working" />
      <div className={`container ${styles.wrapper}`}>
        <h2 className={styles.title}>How We Work</h2>

        <div className={styles.animation}>
          {isActiveAnimate ? (
            <HowWeWorkAnimation />
          ) : (
            <HowWeWorkAnimationClosed />
          )}
          <div className={styles.animation__text_one}>
            <p className={styles.text_color}>{textOne}</p>
          </div>
          <div className={styles.animation__text_two}>
            <p className={styles.text_color}>{textTwo}</p>
          </div>
          <div className={styles.animation__text_tree}>
            <p className={styles.text_color}>
              Somewhere, someone incredible is going to be known.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
