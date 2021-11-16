import React from 'react';
import PropTypes from 'prop-types';

import { noop } from 'utils/index';

const Input = ({
  type,
  value,
  onChange,
  className,
  checked,
  name,
  placeholder,
  ...rest
}) => (
  <input
    type={type}
    name={name}
    value={value}
    checked={checked}
    onChange={onChange}
    className={className}
    placeholder={placeholder}
    {...rest}
  />
);

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  checked: PropTypes.any,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  name: 'inping',
  checked: false,
  onChange: noop,
  className: null,
  value: undefined,
  placeholder: 'Введите название',
};

export default Input;
