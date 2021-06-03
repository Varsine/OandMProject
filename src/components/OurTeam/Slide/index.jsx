import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { teamCard } from 'utils/index';

import Banner from './Banner';

import styles from '../OurTeam.scss';

const Slide = ({ activeIndex }) => {
  const [isAnimate, setIsAnimate] = useState(false);
  const { text, image, title, subtitle } = teamCard[activeIndex];

  useEffect(() => {
    document.documentElement.style.setProperty(
      `--teamImage`,
      `${teamCard[0].image}`,
    );
    setIsAnimate(true);
  }, []);

  useEffect(() => {
    if (activeIndex > 0) {
      setIsAnimate(false);
      document.documentElement.style.setProperty(`--teamImage`, `'sdssdsdds'`);

      setTimeout(
        () =>
          document.documentElement.style.setProperty(`--teamImage`, `${image}`),
        setIsAnimate(true),
        2000,
      );
    }
  }, [activeIndex]);

  const renderBannerList = Array.from(Array(168), (el, index) => {
    return <Banner key={index} index={index} isAnimate={isAnimate} />;
  });

  return (
    <div className={styles.section}>
      <div className={styles.banner}>{renderBannerList}</div>
      <div className={styles.info}>
        <h3>{title}</h3>
        <h4>{subtitle}</h4>
        <p>{text}</p>
      </div>
    </div>
  );
};

Slide.propTypes = {
  activeIndex: PropTypes.number.isRequired,
};

export default Slide;
