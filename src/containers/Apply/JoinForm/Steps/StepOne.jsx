import React from 'react';
import PropTypes from 'prop-types';

import { Field, Button } from 'components/index';
import { fieldsList, noop } from 'utils/index';

import styles from '../Apply.scss';

const StepOne = ({ formState, register, changejobType, jobType }) => {
  const { errors, isValid } = formState;

  const renderFieldsList = fieldsList
    .slice(0, 5)
    .map(({ id, type, name, label, inputType, validation, placeholder }) => {
      return (
        <Field
          id={id}
          key={id}
          name={name}
          type={type}
          label={label}
          jobType={jobType}
          register={register}
          error={errors[name]}
          inputType={inputType}
          validation={validation}
          placeholder={placeholder}
          changejobType={changejobType}
        />
      );
    });

  return (
    <>
      {renderFieldsList}
      <Button type="submit" className={styles.next} disabled={!isValid}>
        Next
      </Button>
    </>
  );
};

StepOne.propTypes = {
  jobType: PropTypes.object,
  register: PropTypes.func,
  formState: PropTypes.object,
  changejobType: PropTypes.func,
};

StepOne.defaultProps = {
  jobType: {},
  register: noop,
  formState: {},
  changejobType: noop,
};

export default StepOne;
