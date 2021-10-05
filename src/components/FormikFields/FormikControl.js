import React from 'react';
import PropTypes from 'prop-types';

import Input from './Input';
import Select from './Select';
// placeholder, type, label, name,
const FormikControl = ({ control, rest }) => {
  switch (control) {
    case 'input':
      return (
        <Input
          // placeholder={placeholder}
          // type={type}
          // label={label}
          // name={name}
          {...rest}
        />
      );

    case 'select':
      return <Select {...rest} />;

    default:
      return null;
  }
};

FormikControl.propTypes = {
  rest: PropTypes.any,
  control: PropTypes.string,
  // placeholder: PropTypes.string,
  // type: PropTypes.string,
  // label: PropTypes.string,
  // name: PropTypes.string,
};

FormikControl.defaultProps = {
  rest: {},
  control: '',
  // placeholder: '',
  // type: '',
  // label: '',
  // name: '',
};
export default FormikControl;
