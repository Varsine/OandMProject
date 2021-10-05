import React from 'react';
import { Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';

import TextError from './TextError';

const Select = ({ label, name, options, ...rest }) => {
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field as="select" id={name} name={name} {...rest}>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  rest: PropTypes.any,
};

Select.defaultProps = {
  label: '',
  name: '',
  options: [],
  rest: {},
};
export default Select;
