import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { Button } from 'components/index';
import { modeSelector } from 'slices/mainSlice';
import { teamCards, noop } from 'utils/index';

import styles from './OurTeam.scss';

import { ArrowIcon, ArrowGdtIcon } from '../../../icons';

const ButtonGroup = ({
  next,
  previous,
  goToSlide,
  carouselState: { currentSlide },
}) => {
  const isDarkMode = useSelector(modeSelector);

  useEffect(() => {
    goToSlide(1);
  }, []);

  const arrIconMode = useMemo(() => {
    if (isDarkMode) {
      return <ArrowIcon />;
    }

    return <ArrowGdtIcon />;
  }, [isDarkMode]);

  return (
    <div className={styles.carousel__controls}>
      <Button
        className={`${styles.carousel__controls_item} ${styles.carousel__controls_left}`}
        onClick={previous}
        disabled={currentSlide === 0}
      >
        {arrIconMode}
      </Button>

      <Button
        className={`${styles.carousel__controls_item} ${styles.carousel__controls_right}`}
        onClick={next}
        disabled={currentSlide === teamCards.length - 3}
      >
        {arrIconMode}
      </Button>
    </div>
  );
};

ButtonGroup.propTypes = {
  next: PropTypes.func,
  previous: PropTypes.func,
  goToSlide: PropTypes.func,
  carouselState: PropTypes.object,
};

ButtonGroup.defaultProps = {
  next: noop,
  previous: noop,
  goToSlide: noop,
  carouselState: {},
};

export default ButtonGroup;
