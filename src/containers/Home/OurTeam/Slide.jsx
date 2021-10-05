import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { modeSelector } from 'slices/mainSlice';

import styles from './OurTeam.scss';

const Slide = ({ slide, isActive }) => {
  const isDarkMode = useSelector(modeSelector);

  const { image, imageLight, title, subtitle } = slide;

  return (
    <div
      className={classNames(styles.carousel__item, {
        [styles.carousel__item_active]: isActive,
      })}
    >
      <div className={styles.carousel__item_imges}>
        <div
          className={classNames(styles.carousel__item_img, {
            [styles.carousel__item_img_active]: isDarkMode,
          })}
          style={{ background: `url(${image})` }}
        />
        <div
          className={classNames(styles.carousel__item_img, {
            [styles.carousel__item_img_active]: !isDarkMode,
          })}
          style={{ background: `url(${imageLight})` }}
        />
      </div>
      <h2 className={styles.carousel__item_title}>{title}</h2>
      <h3 className={styles.carousel__item_subtitle}>{subtitle}</h3>
    </div>
  );
};

Slide.propTypes = {
  slide: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default Slide;
