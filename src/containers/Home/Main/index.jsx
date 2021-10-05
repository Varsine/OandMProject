import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { activeIndexSelector, modeSelector } from 'slices/mainSlice';

import styles from './Main.scss';

import { LogoAnimaIcon, LogoMoveBallIcon } from '../../../icons';

const Main = () => {
  const activeIndex = useSelector(activeIndexSelector);
  const isDarkMode = useSelector(modeSelector);
  const isActive = activeIndex === 1;
  const [isAnimate, setIsAnimate] = useState(false);

  useEffect(() => {
    window.addEventListener('load', () => {
      setIsAnimate(true);
    });
  }, []);

  const showAnimation = isActive ? (
    <>
      <LogoMoveBallIcon className={styles.wrapper__ball} />
      <LogoAnimaIcon
        className={styles.wrapper__logo}
        stopColor={isDarkMode ? '#fff' : '#333'}
      />
    </>
  ) : (
    <LogoAnimaIcon className={styles.wrapper__logo_ball} />
  );

  const renderAnimation = isAnimate && showAnimation;

  return (
    <section id="header" className={classNames('section', styles.container)}>
      <div className="canvas__working" />
      <div className={`${styles.wrapper} container`}>{renderAnimation}</div>
    </section>
  );
};

export default Main;
