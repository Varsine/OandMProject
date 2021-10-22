import React from 'react';
import PropTypes from 'prop-types';

import styles from './Field.scss';

const TextError = ({ message }) => (
  <div className={styles.message}>{message}</div>
);

TextError.propTypes = {
  message: PropTypes.string,
};

TextError.defaultProps = {
  message: '',
};

export default TextError;
