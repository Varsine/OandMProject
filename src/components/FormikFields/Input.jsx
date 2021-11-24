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
  const formContainerClasses = classNames(styles.text, className);

  return (
    <div className={formContainerClasses}>
      <label className={styles.label_style} htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        autoCapitalize="off"
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
  name: PropTypes.string,
  type: PropTypes.string,
  form: PropTypes.object,
  label: PropTypes.string,
  field: PropTypes.object,
  className: PropTypes.string,
  placeholder: PropTypes.string,
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
