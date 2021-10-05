import React from 'react';
import PropTypes from 'prop-types';

const TextError = ({ name }) => <div className="error">{name}</div>;
TextError.propTypes = {
  name: PropTypes.string,
};

TextError.defaultProps = {
  name: '',
};

export default TextError;
