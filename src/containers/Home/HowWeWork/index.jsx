/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { modeSelector, activeIndexSelector } from 'slices/mainSlice';

import HowWeWorkAnimation from './HowWeWork';
import HowWeWorkAnimationClosed from './HowWeWorkclosed';
import styles from './HowWeWork.scss';

const HowWeWork = () => {
  const isDarkMode = useSelector(modeSelector);
  const activeIndex = useSelector(activeIndexSelector);
  const isActiveAnimate = activeIndex === 3;

  return (
    <section
      className={(classNames(styles.height_reponce, styles.we_work), 'section')}
    >
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
            <p
              className={classNames(styles.text_color, {
                [styles.text_color_light]: isDarkMode,
              })}
            >
              If you're offered to seat on a rocket ship, don't ask what, just
              seat!
            </p>
          </div>
          <div className={styles.animation__text_two}>
            <p
              className={classNames(styles.text_color, {
                [styles.text_color_light]: isDarkMode,
              })}
            >
              There's on time for regrets. You've just got to keep moving
              forward.
            </p>
          </div>
          <div className={styles.animation__text_tree}>
            <p
              className={classNames(styles.text_color, {
                [styles.text_color_light]: isDarkMode,
              })}
            >
              Somewhere, someone incredible is going to be known.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
