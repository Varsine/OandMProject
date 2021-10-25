import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { modeSelector } from 'slices/mainSlice';

import styles from './HowWeWork.scss';
import HowWeWorkAnimation from './HowWeWork';

const HowWeWork = () => {
  const isDarkMode = useSelector(modeSelector);

  return (
    <section className={`${styles.height_reponce} ${styles.we_work} section`}>
      <div className="canvas__working" />
      <div className={`${styles.wrapper} container`}>
        <h2 className={styles.title}>How We Work</h2>

        <div className={styles.animation}>
          <HowWeWorkAnimation />
          <div className={styles.animation__text_one}>
            <p
              className={classNames(styles.text_color, {
                [styles.text_color_light]: isDarkMode,
              })}
            >
              We will get acquainted with your application and discuss the
              possible deadlines with our engineering team.
            </p>
          </div>
          <div className={styles.animation__text_two}>
            <p
              className={classNames(styles.text_color, {
                [styles.text_color_light]: isDarkMode,
              })}
            >
              We will provide an hourly based working schedule to give you a
              clear understanding of implementation of your application.
            </p>
          </div>
          <div className={styles.animation__text_tree}>
            <p
              className={classNames(styles.text_color, {
                [styles.text_color_light]: isDarkMode,
              })}
            >
              We will be in daily contact with you, to provide information
              related to the developments of the project.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
