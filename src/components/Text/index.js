import React from 'react';
import PropTypes from 'prop-types';

import styles from './Text.scss';

const Text = ({ children, className, isSubTitle }) => {
  const activeClassName = isSubTitle
    ? styles.wrapper__subtitle
    : styles.wrapper;
  return <p className={`${activeClassName} ${className}`}>{children}</p>;
};

Text.propTypes = {
  isSubTitle: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
};

Text.defaultProps = {
  isSubTitle: false,
  className: '',
};

export default Text;
