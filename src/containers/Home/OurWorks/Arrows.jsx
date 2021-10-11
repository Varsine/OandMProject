import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { noop } from 'utils/helpers';
import { modeSelector } from 'slices/mainSlice';

import styles from './OurWorks.scss';

import { ArrowIcon, ArrowGdtIcon } from '../../../icons';

const Arrows = ({ onClick, type }) => {
  const isDarkMode = useSelector(modeSelector);

  const Arrow = useMemo(() => {
    return isDarkMode ? ArrowIcon : ArrowGdtIcon;
  }, [isDarkMode]);

  const classList = classNames(styles.arrow, {
    [styles.arrow__next]: type === 'prev',
    [styles.arrow__prev]: type === 'next',
  });
  return <Arrow onClick={onClick} className={classList} />;
};

Arrows.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
};
Arrows.defaultProps = {
  onClick: noop,
  type: '',
};

export default Arrows;
