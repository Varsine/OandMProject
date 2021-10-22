import React from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import Input from 'components/FormikFields/Input';
import Select from 'components/FormikFields/Select';

import styles from '../Apply.scss';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const StepOne = ({ editActiveStep, setApplicationForm }) => {
  const initialValues = {
    jobType: 'Back-End Developer',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  };

  const validationSchema = Yup.object({
    jobType: Yup.string().required('* required'),
    firstName: Yup.string().required('* required'),
    lastName: Yup.string().required('* required'),
    email: Yup.string().email('Invalid email format').required('* required'),
    phone: Yup.string()
      .required('* required')
      .matches(phoneRegExp, 'Phone number is not valid'),
  });

  const dropdownOptions = [
    { key: 'Back-End Developer', value: 'Back-End Developer' },
    { key: 'Front-End Developer', value: 'Front-End Developer' },
    { key: 'Product Designer', value: 'Product Designer' },
    { key: 'QA Tester', value: 'QA Tester' },
    { key: 'UX Designer', value: 'UX Designer' },
    { key: '3D Animator', value: '3D Animator' },
    { key: 'Graphic Designer', value: 'Graphic Designer' },
  ];

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
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
            <button className={styles.next} type="submit">
              Next
            </button>
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
