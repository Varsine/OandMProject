import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { noop } from 'utils/index';

import styles from './SliderArrows.scss';

import { DownArrow } from '../../icons/ourWork';

const SliderArrows = ({
  next,
  nextProp,
  previous,
  previousProp,
  arrowStyles,
  ariaPrevLabel,
  ariaNextLabel,
}) => {
  const prevSlideHandler = () => {
    previous();
    previousProp();
  };

  const nextHandler = () => {
    next();
    nextProp();
  };

  return (
    <div className={classNames(arrowStyles, styles.arrow_comp)}>
      <DownArrow
        type="submit"
        onClick={prevSlideHandler}
        aria-label={ariaPrevLabel}
        className={styles.arrow_comp__slide__prev_arrows}
      />
      <DownArrow
        type="submit"
        onClick={nextHandler}
        aria-label={ariaNextLabel}
        className={styles.arrow_comp__slide__next_arrows}
      />
    </div>
  );
};

SliderArrows.propTypes = {
  next: PropTypes.func,
  nextProp: PropTypes.func,
  previous: PropTypes.func,
  previousProp: PropTypes.func,
  arrowStyles: PropTypes.any,
  ariaPrevLabel: PropTypes.string,
  ariaNextLabel: PropTypes.string,
};

SliderArrows.defaultProps = {
  next: noop,
  nextProp: noop,
  previous: noop,
  previousProp: noop,
  arrowStyles: '',
  ariaPrevLabel: 'Slider arrows',
  ariaNextLabel: 'Slider arrows',
};

export default SliderArrows;
