import React from 'react';
import PropTypes from 'prop-types';

import { noop } from 'utils/index';

const Button = ({ onClick, className, children, disabled, ...rest }) => (
  <button
    type="button"
    onClick={onClick}
    className={className}
    disabled={disabled}
    {...rest}
  >
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  onClick: noop,
  disabled: false,
  className: '',
};

export default Button;
