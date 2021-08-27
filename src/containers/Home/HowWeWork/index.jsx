/* eslint-disable no-unused-vars */
import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { modeSelector, activeIndexSelector } from 'slices/mainSlice';

import Rocket from './Rocket';
import styles from './HowWeWork.scss';

import {
  PathIcon,
  ClockIcon,
  HowWeWorkAnimation,
  // RocketIcon,
  HandsLeftIcon,
  HandsRightIcon,
  ClockLightIcon,
  // RocketLightIcon,
} from '../../../icons';

const HowWeWork = () => {
  const isDarkMode = useSelector(modeSelector);
  const activeIndex = useSelector(activeIndexSelector);
  const isAnimate = activeIndex === 3;

  return (
    <section className="section">
      <div className="canvas__working" />
      <div className={styles.wrapper}>
        <h2 className={styles.title}>How We Work</h2>
        <div className={styles.animation}>
          <HowWeWorkAnimation />
        </div>
        <div />
      </div>
    </section>
  );
};

export default HowWeWork;
