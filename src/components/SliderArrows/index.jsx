import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { noop } from 'utils/index';
import { Button } from 'components/index';

import styles from './SliderArrows.scss';

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
      <Button
        onClick={prevSlideHandler}
        ariaLabel={ariaPrevLabel}
        className={styles.arrow_comp__slide__prev_arrows}
      >
        <div className={styles.arrow_comp__slide__prev_arrows__left_content} />
      </Button>

      <Button
        onClick={nextHandler}
        ariaLabel={ariaNextLabel}
        className={styles.arrow_comp__slide__next_arrows}
      >
        <div className={styles.arrow_comp__slide__next_arrows__right_content} />
      </Button>
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
