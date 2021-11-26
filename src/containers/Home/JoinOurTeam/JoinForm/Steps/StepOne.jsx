import React, { useMemo } from 'react';
import { Field, Form, Formik } from 'formik';
import isEqual from 'lodash.isequal';
import PropTypes from 'prop-types';

import { FormikInput, FormikSelect, Button } from 'components/index';
import {
  dropdownOptions,
  stepOneInitialValues,
  stepOneValidationSchema,
} from 'utils/index';

import PhoneInput from '../PhoneInput';
import styles from '../Apply.scss';

const StepOne = ({ editActiveStep, setApplicationForm, applicationForm }) => {
  const initialValues = useMemo(
    () =>
      !isEqual(stepOneInitialValues, applicationForm.stepFirst)
        ? applicationForm.stepFirst
        : stepOneInitialValues,
    [applicationForm],
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={stepOneValidationSchema}
      onSubmit={(values) => {
        setApplicationForm((prevForm) => ({
          ...prevForm,
          stepFirst: values,
        }));
        editActiveStep(2);
      }}
    >
      <Form autoComplete="off" className={styles.form_style}>
        <Field
          name="jobType"
          label="Job type"
          component={FormikSelect}
          options={dropdownOptions}
        />
        <Field
          name="firstName"
          label="First name"
          placeholder="First name"
          component={FormikInput}
        />
        <Field
          name="lastName"
          label="Last name"
          placeholder="Last name"
          component={FormikInput}
        />
        <Field
          name="email"
          label="Email"
          placeholder="Email"
          component={FormikInput}
        />
        <Field name="phoneNumber" component={PhoneInput} />
        <Button className={styles.next} type="submit">
          Next
        </Button>
      </Form>
    </Formik>
  );
};

StepOne.propTypes = {
  editActiveStep: PropTypes.func,
  applicationForm: PropTypes.object,
  setApplicationForm: PropTypes.func,
};

StepOne.defaultProps = {
  applicationForm: {},
  editActiveStep: () => {},
  setApplicationForm: () => {},
};

export default StepOne;
