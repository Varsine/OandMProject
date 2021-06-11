import React from 'react';
// import PropTypes from 'prop-types';

import { fieldsList } from 'utils/index';

import styles from './Apply.scss';

import Field from '../Field';
import Button from '../Button';

const StepTwo = () => {
  const renderFieldsList = fieldsList
    .slice(5, 10)
    .map(({ id, type, label, inputType, placeholder }) => (
      <Field
        id={id}
        key={id}
        type={type}
        label={label}
        inputType={inputType}
        placeholder={placeholder}
      />
    ));

  return (
    <>
      <form>{renderFieldsList}</form>
      <Button className={styles.next}>Send</Button>
    </>
  );
};

// StepTwo.propTypes = {};

export default StepTwo;
