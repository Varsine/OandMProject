import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { modeSelector } from 'slices/mainSlice';

import styles from './OurTeam.scss';

const Slide = ({ slide, isActive }) => {
  const isDarkMode = useSelector(modeSelector);

  const { image, imageLight, title, subtitle } = slide;

  const imgMode = isDarkMode ? image : imageLight;

  return (
    <div
      className={classNames(styles.slides__item, {
        [styles.slides__item_active]: isActive,
      })}
    >
      <div
        className={classNames(styles.slides__item_img, {
          [styles.slides__item_img_active]: isActive,
        })}
        style={{ background: `url(${imgMode})` }}
      />
      <h2 className={styles.slides__item_title}>{title}</h2>
      <h3 className={styles.slides__item_subtitle}>{subtitle}</h3>
    </div>
  );
};

Slide.propTypes = {
  slide: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default Slide;
