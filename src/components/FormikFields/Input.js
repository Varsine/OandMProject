import React from 'react';
import { Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';

import TextError from './TextError';

const Input = ({ label, name, ...rest }) => {
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} {...rest} />
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  rest: PropTypes.any,
};

Input.defaultProps = {
  label: '',
  name: '',
  rest: {},
};

export default Input;
