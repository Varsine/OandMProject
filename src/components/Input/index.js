import React from 'react';
import PropTypes from 'prop-types';

import { noop } from 'utils/index';

const Input = ({ type, className, placeholder, onChange, value, ...rest }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    className={className}
    placeholder={placeholder}
    {...rest}
  />
);

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  value: '',
  onChange: noop,
  className: null,
  placeholder: 'Введите название',
};

export default Input;
