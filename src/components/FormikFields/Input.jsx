import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextError from './TextError';
import styles from './Field.scss';

const Input = ({
  label,
  type,
  placeholder,
  className,
  field: { onChange, name, value },
  form: { touched, errors },
}) => {
  return (
    <div className={classNames(styles.text, className)}>
      <label htmlFor={name}>{label}</label>
      <input
        className={styles.text__change}
        onChange={onChange}
        type={type}
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
  type: PropTypes.string,
  className: PropTypes.string,
  field: PropTypes.object,
  form: PropTypes.object,
};

Input.defaultProps = {
  label: '',
  name: '',
  type: '',
  className: '',
  placeholder: '',
  field: {},
  form: {},
};

export default Input;
