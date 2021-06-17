import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { modeSelector } from 'slices/mainSlice';

import styles from './OurWorks.scss';

import { ArrowIcon, ArrowGdtIcon } from '../../../icons';

const PrevArrow = ({ onClick }) => {
  const isDarkMode = useSelector(modeSelector);

  return isDarkMode ? (
    <ArrowIcon
      onClick={onClick}
      className={classNames(styles.arrow, styles.arrow__prev)}
    />
  ) : (
    <ArrowGdtIcon
      onClick={onClick}
      className={classNames(styles.arrow, styles.arrow__prev)}
    />
  );
};

PrevArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default PrevArrow;
