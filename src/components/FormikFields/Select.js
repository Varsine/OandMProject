import React from 'react';
import PropTypes from 'prop-types';

import TextError from './TextError';

const Select = ({
  label,
  placeholder,
  field: { onChange, name, value },
  form: { touched, errors },
  options,
}) => {
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Select value={value} onChange={onChange} placeholder={placeholder}>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Select>
      {touched[name] && errors[name] && (
        <TextError component={TextError} message={errors[name]} />
      )}
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  field: PropTypes.object,
  form: PropTypes.object,
  options: PropTypes.array,
};

Select.defaultProps = {
  label: '',
  name: '',
  placeholder: '',
  field: {},
  form: {},
  options: [],
};
export default Select;
