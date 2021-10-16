import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useWindowSize } from 'hooks/index';
import { activeIndexSelector, modeSelector } from 'slices/mainSlice';

import styles from './Main.scss';

import { LogoAnimaIcon, LogoMoveBallIcon } from '../../../icons';

const Main = () => {
  const { isDesktop } = useWindowSize();
  const activeIndex = useSelector(activeIndexSelector);
  const isDarkMode = useSelector(modeSelector);
  const isActive = activeIndex === 1;

  const [isMove, setIsMove] = useState(false);
  const [isBall, setIsBall] = useState(false);
  const [isAnimate, setIsAnimate] = useState(false);
  const isShowLogo = isDesktop ? isMove : isActive;

  useEffect(() => {
    window.addEventListener('load', () => {
      setIsAnimate(true);
    });
  }, []);

  useEffect(() => {
    if (isActive) {
      setIsMove(true);
      if (isAnimate) {
        setIsBall(true);

        setTimeout(() => {
          setIsBall(false);
        }, 3500);
      }
    } else {
      setTimeout(() => {
        setIsMove(false);
      }, 1300);
    }
  }, [isAnimate, isActive]);

  const showAnimation = isShowLogo && (
    <>
      {isBall && <LogoMoveBallIcon className={styles.wrapper__ball} />}
      <LogoAnimaIcon
        className={styles.wrapper__logo}
        stopColor={isDarkMode ? '#fff' : '#333'}
      />
    </>
  );

  const renderAnimation = isAnimate && showAnimation;

  return (
    <section id="header" className={`section ${styles.container}`}>
      <div className="canvas__working" />
      <div className={`${styles.wrapper} container`}>{renderAnimation}</div>
    </section>
  );
};

export default Main;
