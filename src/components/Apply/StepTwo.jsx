import React from 'react';
import PropTypes from 'prop-types';

import { fieldsList, noop } from 'utils/index';

import styles from './Apply.scss';

import Field from '../Field';
import Button from '../Button';

const StepTwo = ({ formState, register }) => {
  const { errors, isValid } = formState;

  const renderFieldsList = fieldsList
    .slice(5, 10)
    .map(({ id, type, name, label, inputType, validation, placeholder }) => (
      <Field
        id={id}
        key={id}
        name={name}
        type={type}
        label={label}
        error={errors[name]}
        register={register}
        inputType={inputType}
        validation={validation}
        placeholder={placeholder}
      />
    ));

  return (
    <>
      {renderFieldsList}
      <Button type="submit" className={styles.next} disabled={!isValid}>
        Send
      </Button>
    </>
  );
};

StepTwo.propTypes = {
  register: PropTypes.func,
  formState: PropTypes.object,
};

StepTwo.defaultProps = {
  register: noop,
  formState: {},
};

export default StepTwo;
