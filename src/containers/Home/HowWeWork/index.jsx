import React from 'react';
import { useSelector } from 'react-redux';

import { modeSelector, activeIndexSelector } from 'slices/mainSlice';

import styles from './HowWeWork.scss';
import HowWeWorkAnimation from './HowWeWork';

const HowWeWork = () => {
  const isDarkMode = useSelector(modeSelector);
  const activeIndex = useSelector(activeIndexSelector);
  const isActiveAnimate = activeIndex === 3;
  const textColor = isDarkMode ? '#F1F2F2' : '#1D1D1D';

  return (
    <section className="section">
      <div className="canvas__working" />
      <div className={`${styles.wrapper} container`}>
        <h2 className={styles.title}>How We Work</h2>

        <div className={styles.animation}>
          {isActiveAnimate && <HowWeWorkAnimation />}
          <div className={styles.animation__text_one}>
            <p style={{ color: textColor }}>
              The first step of our work is to get acquainted with your
              application and discuss the possible deadlines with our
              engineering team.
            </p>
          </div>
          <div className={styles.animation__text_two}>
            <p style={{ color: textColor }}>
              We will provide an hourly based working schedule that will give
              you a clear understanding of implementation of your application.
            </p>
          </div>
          <div className={styles.animation__text_tree}>
            <p style={{ color: textColor }}>
              Our management team will be in daily contact providing information
              related to the developments of your project.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
