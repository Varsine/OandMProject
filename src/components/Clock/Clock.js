import React from 'react';
import PropTypes from 'prop-types';

import styles from './Clock.scss';

const Clock = ({ hourRatio, minuteRatio, secondRatio }) => {
  return (
    <div className="clock">
      <div
        className="hand hour"
        style={{ transform: `translate(-50%) rotate(${hourRatio * 360}deg)` }}
      />
      <div
        className="hand minute"
        style={{ transform: `translate(-50%) rotate(${minuteRatio * 360}deg)` }}
      />
      <div
        className="hand second"
        style={{ transform: `translate(-50%) rotate(${secondRatio * 360}deg)` }}
      />
      <div className={styles.mexanical_container}>
        <span className={styles.mexanical_container__closer} />
        <div className={styles.mexanical_container__image_block}>
          <span className={styles.mexanical_container__image_block_img} />
        </div>
        <div className={styles.mexanical_container__plyus}>
          <span className={styles.mexanical_container__plyus_top} />
          <span className={styles.mexanical_container__plyus_right} />
        </div>
        <div className={styles.mexanical_container_inf_block}>
          <span className={styles.mexanical_container_inf_block__infinity} />
        </div>
        <div className={styles.mexanical_container_mexanic1}>
          <span className={styles.mexanical_container_mexanic1__item1} />
        </div>
        <div className={styles.mexanical_container_mexanic2}>
          <span className={styles.mexanical_container_mexanic2__item21} />
          <span className={styles.mexanical_container_mexanic2__item22} />
        </div>
      </div>
      <div className="number number1" />
      <div className="number number2" />
      <div className="number number3" />
      <div className="number number4" />
      <div className="number number5" />
      <div className="number number6" />
      <div className="number number7" />
      <div className="number number8" />
      <div className="number number9" />
      <div className="number number10" />
      <div className="number number11" />
      <div className="number number12" />
    </div>
  );
};

Clock.propTypes = {
  hourRatio: PropTypes.number.isRequired,
  minuteRatio: PropTypes.number.isRequired,
  secondRatio: PropTypes.number.isRequired,
};

export default Clock;
