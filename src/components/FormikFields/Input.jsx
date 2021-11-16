import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TextError } from 'components/index';

import styles from './Field.scss';

const Input = ({
  type,
  label,
  className,
  placeholder,
  form: { touched, errors },
  field: { onChange, name, value },
}) => {
  return (
    <div className={classNames(styles.text, className)}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.text__change}
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
  name: '',
  type: '',
  form: {},
  label: '',
  field: {},
  className: '',
  placeholder: '',
};

export default Input;
