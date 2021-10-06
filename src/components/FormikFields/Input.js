import React from 'react';
import PropTypes from 'prop-types';

import TextError from './TextError';

const Input = ({
  label,
  placeholder,
  field: { onChange, name, value },
  form: { touched, errors },
}) => {
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <input
        onChange={onChange}
        value={value}
        name={name}
        placeholder={placeholder}
      />
      {touched[name] && errors[name] && (
        <TextError component={TextError} message={errors[name]} />
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  field: PropTypes.object,
  form: PropTypes.object,
};

Input.defaultProps = {
  label: '',
  name: '',
  placeholder: '',
  field: {},
  form: {},
};

export default Input;
