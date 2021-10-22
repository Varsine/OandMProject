import React from 'react';
import { Field, Form, Formik } from 'formik';
import PropTypes from 'prop-types';

import Input from 'components/FormikFields/Input';
import Button from 'components/Button';
import Select from 'components/FormikFields/Select';

import {
  dropdownOptions,
  stepOneInitialValues,
  stepOneValidationSchema,
} from './JoinFormConstants';

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
          <Form autoComplete="off">
            <Field
              name="jobType"
              label="Job type"
              component={Select}
              options={dropdownOptions}
            />
            <Field
              name="firstName"
              label="First name"
              placeholder="First name"
              component={Input}
            />
            <Field
              name="lastName"
              label="Last name"
              placeholder="Last name"
              component={Input}
            />
            <Field
              name="email"
              label="Email"
              placeholder="Email"
              component={Input}
            />
            <Field
              name="phone"
              label="Phone number"
              placeholder="Phone number"
              type="tel"
              component={Input}
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
  setApplicationForm: PropTypes.func,
};
StepOne.defaultProps = {
  editActiveStep: () => {},
  setApplicationForm: () => {},
};
export default StepOne;
