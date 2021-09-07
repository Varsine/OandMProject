import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { modeSelector, activeIndexSelector } from 'slices/mainSlice';

import Rocket from './Rocket';
import styles from './HowWeWork.scss';

import {
  PathIcon,
  ClockIcon,
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
      <div className={classNames(styles.wrapper, 'container')}>
        <h2 className={styles.title}>How We Work</h2>
        <div className={styles.animation}>
          <div
            className={classNames(
              styles.animation__item,
              styles.animation__rocket,
              { [styles.animation__item_light]: !isDarkMode },
            )}
          >
            {/* <RocketIcon
              className={classNames(styles.rocket__light, {
                [styles.rocket__light_active]: isAnimate && !isDarkMode,
                [styles.rocket__light_animation]: isAnimate,
              })}
            /> */}
            <Rocket
              isAnimate={isAnimate}
              isDarkMode={isDarkMode}
              className={classNames(styles.rocket, {
                [styles.rocket__animation]: isAnimate,
              })}
            />
            <div className={styles.animation__path}>
              <PathIcon
                className={classNames({
                  [styles.animation__path_icon]: isDarkMode,
                })}
              />
            </div>
          </div>

          <div
            className={classNames(
              styles.animation__item,
              styles.animation__clock,
              {
                [styles.animation__item_light]: !isDarkMode,
                [styles.animation__clock_isAnimate]: isAnimate,
              },
            )}
          >
            {isDarkMode ? (
              <ClockLightIcon
                className={classNames({ [styles.clock]: isAnimate })}
              />
            ) : (
              <ClockIcon
                className={classNames({ [styles.clock]: isAnimate })}
              />
            )}
          </div>
          <div
            className={classNames(
              styles.animation__item,
              styles.animation__hands,
              {
                [styles.animation__item_light]: !isDarkMode,
                [styles.animation__hands_isAnimate]: isAnimate,
              },
            )}
          >
            <div className={styles.animation__hands_icons}>
              <HandsLeftIcon
                className={classNames(styles.animation__hands_icons_left, {
                  [styles.isAnimate__left]: isAnimate,
                })}
              />
              <HandsRightIcon
                className={classNames(styles.animation__hands_icons_right, {
                  [styles.isAnimate__right]: isAnimate,
                })}
              />
            </div>
          </div>
        </div>
        <div />
      </div>
    </section>
  );
};

export default HowWeWork;
