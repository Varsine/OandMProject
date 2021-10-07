import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

import Input from './Input';
import Select from './Select';
// placeholder, type, label, name,
const FormikControl = ({ control, rest }) => {
  switch (control) {
    case 'input':
      return <Field name={rest.name} {...rest} component={Input} />;

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
