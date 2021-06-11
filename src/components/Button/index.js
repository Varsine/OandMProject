import React from 'react';
import PropTypes from 'prop-types';

import { noop } from 'utils/index';

const Button = ({ onClick, className, children, ...rest }) => (
  <button type="button" onClick={onClick} className={className} {...rest}>
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
};

Button.defaultProps = {
  className: '',
  onClick: noop,
};

export default Button;
