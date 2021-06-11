import React from 'react';
// import PropTypes from 'prop-types';

import { fieldsList } from 'utils/index';

import styles from './Apply.scss';

import Field from '../Field';
import Button from '../Button';

const StepOne = () => {
  const renderFieldsList = fieldsList
    .slice(0, 5)
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
      <Button className={styles.next}>Next</Button>
    </>
  );
};

// StepOne.propTypes = {};

export default StepOne;
