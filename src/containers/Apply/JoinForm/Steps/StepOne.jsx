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

const StepOne = ({ editActiveStep, setApplicationForm, applicationForm }) => {
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
          <Form autoComplete="off" className={styles.form_style}>
            <Field
              name="jobType"
              label="Job type"
              component={FormikSelect}
              options={dropdownOptions}
              defaultValue={applicationForm.jobType}
            />
            <Field
              name="firstName"
              label="First name"
              placeholder="First name"
              component={FormikInput}
              defaultValue={applicationForm.firstName}
            />
            <Field
              name="lastName"
              label="Last name"
              placeholder="Last name"
              component={FormikInput}
              defaultValue={applicationForm.lastName}
            />
            <Field
              name="email"
              label="Email"
              placeholder="Email"
              component={FormikInput}
              defaultValue={applicationForm.email}
            />
            <Field
              name="phoneNumber"
              component={PhoneInput}
              defaultValue={applicationForm.phoneNumber}
            />
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
  applicationForm: PropTypes.object,
  setApplicationForm: PropTypes.func,
};

StepOne.defaultProps = {
  applicationForm: {},
  editActiveStep: () => {},
  setApplicationForm: () => {},
};

export default StepOne;
