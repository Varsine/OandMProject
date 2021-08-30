import React, { useState, useEffect } from 'react';
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
    setIsAnimate(isActive);
  }, [activeIndex]);

  return (
    <section id="header" className="section">
      <div className="canvas__working" />
      <div className={styles.wrapper}>
        {isAnimate ? (
          <>
            <LogoMoveBallIcon className={styles.wrapper__ball} />
            <LogoAnimaIcon
              className={styles.wrapper__logo}
              stopColor={isDarkMode ? '#fff' : '#333'}
            />
          </>
        ) : (
          <LogoAnimaIcon />
        )}
      </div>
    </section>
  );
};

export default Main;
