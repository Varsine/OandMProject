import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form, Formik } from 'formik';

import { FormikInput, FormikSelect, Button } from 'components/index';
import {
  dropdownOptions,
  stepOneInitialValues,
  stepOneValidationSchema,
} from 'utils/index';

import PhoneInput from '../PhoneInput';
import styles from '../Apply.scss';

const StepOne = ({ editActiveStep, setApplicationForm }) => {
  return (
    <>
      <Formik
        initialValues={stepOneInitialValues}
        validationSchema={stepOneValidationSchema}
        onSubmit={(values) => {
          setApplicationForm(values);
          editActiveStep(2);
        }}
      >
        {() => (
          <Form className={styles.form_style} autoComplete="off">
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
        )}
      </Formik>
    </>
  );
};

StepOne.propTypes = {
  editActiveStep: PropTypes.func,
  setApplicationForm: PropTypes.func,
};

StepOne.defaultProps = {
  editActiveStep: () => {},
  setApplicationForm: () => {},
};

export default StepOne;
