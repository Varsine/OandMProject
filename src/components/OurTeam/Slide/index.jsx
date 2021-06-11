import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { teamCards, addCssVariables } from 'utils/index';

import Banner from './Banner';

import styles from '../OurTeam.scss';

const Slide = ({ activeIndex, isDarkMode }) => {
  const [isAnimate, setIsAnimate] = useState(false);
  const { text, image, imageLight, animPosition, title, subtitle } =
    teamCards[activeIndex];
  const photoByMode = isDarkMode ? image : imageLight;

  useEffect(() => {
    addCssVariables('teamImage', photoByMode);
    setIsAnimate(true);
  }, [isDarkMode]);

  const renderBannerList = Array.from(Array(168), (el, index) => {
    return (
      <Banner
        key={index}
        index={index}
        isAnimate={isAnimate}
        animPosition={animPosition}
      />
    );
  });

  return (
    <div className={styles.section}>
      <div className={styles.banner}>{renderBannerList}</div>
      <div className={styles.info}>
        <h3 className={styles.info__title}>{title}</h3>
        <h4 className={styles.info__subtitle}>{subtitle}</h4>
        <p className={styles.info__text}>{text}</p>
      </div>
    </div>
  );
};

Slide.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  activeIndex: PropTypes.number.isRequired,
};

export default Slide;
