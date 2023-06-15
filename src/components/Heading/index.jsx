import React from 'react';
import PropTypes from 'prop-types';

import styles from './Heading.scss';

const Heading = ({ children, className, isTitle }) => (
  <>
    {isTitle ? (
      <h2 className={`${styles.wrapper} ${className}`}>{children}</h2>
    ) : (
      <h1 className={`${styles.wrapper} ${className}`}>{children}</h1>
    )}
  </>
);

Heading.propTypes = {
  isTitle: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
};

Heading.defaultProps = {
  isTitle: false,
  className: '',
};

export default Heading;
