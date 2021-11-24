import React from 'react';
import { getIn } from 'formik';
import PropTypes from 'prop-types';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

import { TextError } from 'components/index';

import styles from '../Apply.scss';

const PhoneInputComponent = (props) => {
  const {
    className,
    country,
    disabled,
    field: { name, value },
    form: { errors, setFieldValue, touched },
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
        name={name}
        value={value}
        country={country}
        onChange={telNumChange}
        disableDropdown={false}
        placeholder="Enter phone number"
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
  label: PropTypes.string,
  disabled: PropTypes.bool,
  country: PropTypes.string,
  className: PropTypes.string,
  form: PropTypes.any.isRequired,
  field: PropTypes.any.isRequired,
};

PhoneInputComponent.defaultProps = {
  label: '',
  country: 'am',
  className: '',
  disabled: false,
};

export default PhoneInputComponent;
