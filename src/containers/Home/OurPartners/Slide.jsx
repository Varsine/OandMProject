import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './OurPartners.scss';

const Slide = ({ slide, isActive }) => {
  const { icon } = slide;

  const sliderItemClasses = useMemo(
    () =>
      classNames(styles.carousel__item, {
        [styles.carousel__item_active]: isActive,
      }),
    [isActive],
  );

  return <div className={sliderItemClasses}>{icon}</div>;
};

Slide.propTypes = {
  slide: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default Slide;
