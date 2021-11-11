import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import { activeIndexSelector } from 'slices/mainSlice';

import styles from './Main.scss';

import { LogoAnimaIcon, LogoMoveBallIcon } from '../../../icons';

const Main = () => {
  const { ref, inView } = useInView({
    threshold: 0.9,
  });

  const activeIndex = useSelector(activeIndexSelector);

  const isActive = activeIndex === 1;

  const [isAnimate, setIsAnimate] = useState(false);
  const [activeClass, setActiveClass] = useState(false);

  useEffect(() => {
    if (activeIndex !== 1) {
      setActiveClass(true);
    }
  }, [isActive]);

  const showAnimation = isActive ? (
    <>
      <LogoAnimaIcon
        className={classNames(styles.wrapper__logo, {
          [styles.wrapper__logo_active]: activeClass,
        })}
        stopColor="#fff"
        isAnima
        fastAnima={activeClass}
      />
    </>
  ) : (
    <LogoAnimaIcon className={styles.wrapper__logo_fixed} stopColor="#fff" />
  );
  const renderAnimation = isAnimate && showAnimation;

  const containerClasses = classNames(`container ${styles.wrapper}`, {
    [styles.wrapper__animation]: !inView,
  });

  return (
    <section
      ref={ref}
      id="header"
      className={`section fp-auto-height ${styles.container}`}
    >
      <div className="canvas__working" />
      <div className={containerClasses}>
        <LogoMoveBallIcon
          className={styles.wrapper__ball}
          setisanimate={setIsAnimate}
        />
        {renderAnimation}
      </div>
    </section>
  );
};

export default Main;
