import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from '../OurTeam.scss';

const Banner = ({ index, isAnimate }) => {
  const [xPosition, setXposition] = useState(index);
  const [yPosition, setYposition] = useState(0);

  const calculateXposition = `${xPosition > 0 ? `-${xPosition}00` : 0}%`;
  const calculateYposition = `${yPosition > 0 ? `-${yPosition}00` : 0}%`;

  useEffect(() => {
    if (index > 11 && index <= 23) {
      setXposition(index - 12);
      setYposition(1);
    }
    if (index > 23 && index <= 35) {
      setXposition(index - 24);
      setYposition(2);
    }
    if (index > 35 && index <= 47) {
      setXposition(index - 36);
      setYposition(3);
    }
    if (index > 47 && index <= 59) {
      setXposition(index - 48);
      setYposition(4);
    }
    if (index > 59 && index <= 71) {
      setXposition(index - 60);
      setYposition(5);
    }
    if (index > 71 && index <= 83) {
      setXposition(index - 72);
      setYposition(6);
    }
    if (index > 83 && index <= 95) {
      setXposition(index - 84);
      setYposition(7);
    }
    if (index > 95 && index <= 107) {
      setXposition(index - 96);
      setYposition(8);
    }
    if (index > 107 && index <= 119) {
      setXposition(index - 108);
      setYposition(9);
    }
    if (index > 119 && index <= 131) {
      setXposition(index - 120);
      setYposition(10);
    }
    if (index > 131 && index <= 143) {
      setXposition(index - 132);
      setYposition(11);
    }
    if (index > 143 && index <= 155) {
      setXposition(index - 144);
      setYposition(12);
    }
    // if (index > 155 && index <= 167) {
    //   setXposition(index - 156);
    //   setYposition(13);
    // }
  }, [index]);

  return (
    <div
      style={{
        animationDelay: `${(index + 1) * 0.02}s`,
        backgroundPosition: `${calculateXposition} ${calculateYposition}`,
      }}
      className={classNames(styles.banner__item, {
        [styles.banner__item_active]: isAnimate,
      })}
    />
  );
};

Banner.propTypes = {
  index: PropTypes.number.isRequired,
  isAnimate: PropTypes.bool.isRequired,
};

export default Banner;
