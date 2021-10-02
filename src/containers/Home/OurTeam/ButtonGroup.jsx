import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { Button } from 'components/index';
import { modeSelector } from 'slices/mainSlice';
import { teamCards, noop } from 'utils/index';

import styles from './OurTeam.scss';

import { ArrowIcon, ArrowGdtIcon } from '../../../icons';

const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
  const {
    carouselState: { currentSlide },
  } = rest;

  const isDarkMode = useSelector(modeSelector);

  useEffect(() => {
    goToSlide(1);
  }, []);

  const arrIconMode = isDarkMode ? <ArrowIcon /> : <ArrowGdtIcon />;

  return (
    <div className={styles.carousel__controls}>
      <Button
        className={classNames(
          styles.carousel__controls_item,
          styles.carousel__controls_left,
        )}
        onClick={() => previous()}
        disabled={currentSlide === 0}
      >
        {arrIconMode}
      </Button>

      <Button
        className={classNames(
          styles.carousel__controls_item,
          styles.carousel__controls_right,
        )}
        onClick={() => next()}
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
};

ButtonGroup.defaultProps = {
  next: noop,
  previous: noop,
  goToSlide: noop,
};

export default ButtonGroup;
