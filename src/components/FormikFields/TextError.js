import React from 'react';
import PropTypes from 'prop-types';

const TextError = ({ message }) => <div className="error">{message}</div>;
TextError.propTypes = {
  message: PropTypes.string,
};

TextError.defaultProps = {
  message: '',
};

export default TextError;
