import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { modeSelector } from 'slices/mainSlice';

import styles from './OurPartners.scss';

const Slide = ({ slide, isActive }) => {
  const isDarkMode = useSelector(modeSelector);

  const { icon, iconLight } = slide;

  return (
    <div
      className={classNames(styles.carousel__item, {
        [styles.carousel__item_active]: isActive,
      })}
    >
      {isDarkMode ? icon : iconLight}
    </div>
  );
};

Slide.propTypes = {
  slide: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default Slide;
