import React from 'react';
import PropTypes from 'prop-types';

import { noop } from 'utils/index';
import { Button } from 'components/index';

import styles from './SliderArrows.scss';

const SliderArrows = ({
  prevHandler,
  nextHandler,
  ariaPrevLabel,
  ariaNextLabel,
}) => (
  <div className={styles.arrow_comp}>
    <Button
      onClick={prevHandler}
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

SliderArrows.propTypes = {
  prevHandler: PropTypes.func,
  nextHandler: PropTypes.func,
  ariaPrevLabel: PropTypes.string,
  ariaNextLabel: PropTypes.string,
};

SliderArrows.defaultProps = {
  prevHandler: noop,
  nextHandler: noop,
  ariaPrevLabel: 'Slider arrows',
  ariaNextLabel: 'Slider arrows',
};

export default SliderArrows;
