import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { noop } from 'utils/helpers';
import { modeSelector } from 'slices/mainSlice';

import styles from './OurWorks.scss';

import { ArrowIcon, ArrowGdtIcon } from '../../../icons';

const NextArrow = ({ onClick, type }) => {
  const isDarkMode = useSelector(modeSelector);

  const Arrow = isDarkMode ? ArrowIcon : ArrowGdtIcon;
  const classList = classNames(styles.arrow, {
    [styles.arrow__next]: type === 'next',
    [styles.arrow__prev]: type === 'prev',
  });
  return <Arrow onClick={onClick} className={classList} />;
};

NextArrow.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
};
NextArrow.defaultProps = {
  onClick: noop,
  type: '',
};

export default NextArrow;
