import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { modeSelector } from 'slices/mainSlice';

import styles from './OurPartners.scss';

const Slide = ({ slide, isActive }) => {
  const isDarkMode = useSelector(modeSelector);

  const { icon, iconLight } = slide;

  const sliderItemClasses = useMemo(
    () =>
      classNames(styles.carousel__item, {
        [styles.carousel__item_active]: isActive,
      }),
    [isActive],
  );

  return (
    <div className={sliderItemClasses}>{isDarkMode ? icon : iconLight}</div>
  );
};

Slide.propTypes = {
  slide: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default Slide;
