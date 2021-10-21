import React from 'react';
import PropTypes from 'prop-types';

import { noop } from 'utils/index';

const Button = ({
  onClick,
  children,
  disabled,
  className,
  ariaLabel,
  ...rest
}) => (
  <button
    {...rest}
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={className}
    aria-label={ariaLabel}
  >
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
  children: PropTypes.any.isRequired,
};

Button.defaultProps = {
  onClick: noop,
  className: '',
  disabled: false,
  ariaLabel: 'Slider arrows',
};

export default Button;
