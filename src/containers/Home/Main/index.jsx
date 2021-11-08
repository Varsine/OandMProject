import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { activeIndexSelector, modeSelector } from 'slices/mainSlice';

import styles from './Main.scss';

import { LogoAnimaIcon, LogoMoveBallIcon } from '../../../icons';

// eslint-disable-next-line no-unused-vars
const Main = ({ inView }) => {
  const activeIndex = useSelector(activeIndexSelector);
  const isDarkMode = useSelector(modeSelector);
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
        stopColor={isDarkMode ? '#fff' : '#333'}
        isAnima
        fastAnima={activeClass}
      />
    </>
  ) : (
    <LogoAnimaIcon
      className={styles.wrapper__logo_fixed}
      stopColor={isDarkMode ? '#fff' : '#333'}
    />
  );
  const renderAnimation = isAnimate && showAnimation;

  return (
    <section id="header" className={`section ${styles.container}`}>
      <div className="canvas__working" />
      <div className={`container ${styles.wrapper}`}>
        <LogoMoveBallIcon
          className={styles.wrapper__ball}
          setisanimate={setIsAnimate}
        />
        {renderAnimation}
      </div>
    </section>
  );
};

Main.propTypes = {
  inView: PropTypes.bool,
};

Main.defaultProps = {
  inView: false,
};

export default Main;
