import React from 'react';
import PhoneInput from 'react-phone-input-2';
import PropTypes from 'prop-types';
import 'react-phone-input-2/lib/style.css';
import { getIn } from 'formik';

import { TextError } from 'components/index';

import styles from '../Apply.scss';

const PhoneInputComponent = (props) => {
  const {
    className,
    field: { name, value },
    form: { errors, setFieldValue, touched },
    country,
    disabled,
  } = props;

  const isError = getIn(touched, name) && getIn(errors, name);
  const errorStyle = isError ? 'error' : '';
  const disabledStyle = disabled ? 'disabled' : '';

  const telNumChange = (phoneNumber) => {
    setFieldValue(name, phoneNumber);
  };

  return (
    <div
      className={`${styles.phone__number} ${className} ${errorStyle} ${disabledStyle} text-input-group`}
    >
      <PhoneInput
        placeholder="Enter phone number"
        name={name}
        value={value}
        disableDropdown={false}
        onChange={telNumChange}
        country={country}
      />
      <div className={styles.phone__number_error_phone}>
        {touched[name] && errors[name] && (
          <TextError
            message={
              errors[name].length === 10
                ? errors[name]
                : 'Phone number not valid'
            }
          />
        )}
      </div>
    </div>
  );
};

PhoneInputComponent.propTypes = {
  className: PropTypes.string,
  form: PropTypes.any.isRequired,
  field: PropTypes.any.isRequired,
  label: PropTypes.string,
  country: PropTypes.string,
  disabled: PropTypes.bool,
};

PhoneInputComponent.defaultProps = {
  label: '',
  country: 'am',
  className: '',
  disabled: false,
};

export default PhoneInputComponent;
