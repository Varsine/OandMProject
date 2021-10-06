import React, { useState } from 'react';
import classNames from 'classnames';
import * as Yup from 'yup';
import { Form, Formik, Field } from 'formik';

import { Button } from 'components/index';
// import FormikControl from 'components/FormikFields/FormikControl';

import Input from 'components/FormikFields/Input';

import styles from './Apply.scss';
// import Success from './Steps/Success';

import { StepIcon } from '../../../icons';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const JoinForm = () => {
  // const initialValues = {
  //   jobType: '',
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   phoneNumber: '',
  //   resume: '',
  //   coverLetter: '',
  //   githubLink: '',
  //   linkedInLink: '',
  // };

  const validationSchema = Yup.object({
    jobType: Yup.string().required('Job type is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    resume: Yup.object().shape({
      file: Yup.mixed()
        .required('A file is required')
        .test('fileFormat', 'PDF or DOC files only', (value) => {
          return (
            value &&
            [
              'application/pdf',
              'application/msword',
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            ].includes(value.type)
          );
        }),
    }),
    coverLetter: Yup.object().shape({
      file: Yup.mixed()
        .required('A file is required')
        .test('fileFormat', 'PDF or DOC files only', (value) => {
          return (
            value &&
            [
              'application/pdf',
              'application/msword',
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            ].includes(value.type)
          );
        }),
    }),
    githubLink: Yup.string().matches(
      '/^https:\\/\\/github\\.com\\/.*$/gim',
      'Invalid GitHub link',
    ),
    linkedInLink: Yup.string().matches(
      '/^https:\\/\\/[a-z]{2,3}\\.linkedin\\.com\\/.*$/gim',
      'Invalid LinkedIn link',
    ),
  });

  // const onSubmit = () => {
  //   // console.log('Form data', values);
  // };

  const [activeIndex, setIsActiveIndex] = useState(1);

  const editActiveStep = (step) => {
    setIsActiveIndex(step);
  };
  // const dropdownOptions = [
  //   { key: 'Back-End Developer', value: 'option1' },
  //   { key: 'Front-End Developer', value: 'option2' },
  //   { key: 'Product Designer', value: 'option3' },
  //   { key: 'QA Tester', value: 'option4' },
  //   { key: 'UX Designer', value: 'option5' },
  //   { key: '3D Animator', value: 'option6' },
  //   { key: 'Graphic Designer', value: 'option7' },
  // ];

  return (
    <section className="section">
      {/* <div className="canvas__working" /> */}
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Apply Now!</h1>
          <p className={styles.subtitle}>Submit your information here!</p>
          <div className={styles.steps}>
            <Button
              onClick={() => editActiveStep(1)}
              className={classNames(styles.steps__item, {
                [styles.steps__item_active]: activeIndex >= 1,
              })}
            >
              1
            </Button>
            <StepIcon />
            <Button
              disabled={activeIndex === 1}
              onClick={() => editActiveStep(2)}
              className={classNames(styles.steps__item, {
                [styles.steps__item_active]: activeIndex === 2,
              })}
            >
              2
            </Button>
          </div>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              // same shape as initial values
              console.log(values);
            }}
          >
            {() => (
              <Form>
                <Field
                  name="jobType"
                  label="Job type"
                  placeholder=""
                  component={Input}
                />
                <Field
                  name="firstName"
                  label="First name"
                  placeholder="First name"
                  component={Input}
                />

                {/* {errors.lastName && touched.lastName ? ( */}
                {/*  <div>{errors.lastName}</div> */}
                {/* ) : null} */}
                <Field name="email" type="email" />
                {/* {errors.email && touched.email ? ( */}
                {/*  <div>{errors.email}</div> */}
                {/* ) : null} */}
                <button type="submit">Submit</button>
              </Form>
            )}
          </Formik>
          {/* <Formik */}
          {/*  initialValues={initialValues} */}
          {/*  validationSchema={validationSchema} */}
          {/*  validateOnChange */}
          {/*  validateOnMount={false} */}
          {/*  onSubmit={onSubmit} */}
          {/* > */}
          {/*  {(formik, touched) => { */}
          {/*    return ( */}
          {/*      <Form> */}
          {/*        {console.log(touched, 'fasdfjdsakhfkjdsh')} */}
          {/*        {activeIndex === 1 && ( */}
          {/*          <> */}
          {/*            <FormikControl */}
          {/*              control="select" */}
          {/*              rest={{ */}
          {/*                label: 'Job type', */}
          {/*                name: 'selectOption', */}
          {/*                options: dropdownOptions, */}
          {/*              }} */}
          {/*            /> */}

          {/*            <FormikControl */}
          {/*              control="input" */}
          {/*              rest={{ */}
          {/*                placeholder: 'First Name', */}
          {/*                type: 'text', */}
          {/*                label: 'First Name', */}
          {/*                name: 'firstName', */}
          {/*              }} */}
          {/*            /> */}
          {/*            <FormikControl */}
          {/*              control="input" */}
          {/*              rest={{ */}
          {/*                placeholder: 'Last Name', */}
          {/*                type: 'text', */}
          {/*                label: 'Last Name', */}
          {/*                name: 'lastName', */}
          {/*              }} */}
          {/*            /> */}
          {/*            <FormikControl */}
          {/*              control="input" */}
          {/*              rest={{ */}
          {/*                placeholder: 'Email', */}
          {/*                type: 'email', */}
          {/*                label: 'Email', */}
          {/*                name: 'email', */}
          {/*              }} */}
          {/*            /> */}
          {/*            <FormikControl */}
          {/*              rest={{ */}
          {/*                placeholder: 'Phone number', */}
          {/*                type: 'text', */}
          {/*                label: 'Phone number', */}
          {/*                name: 'phoneNumber', */}
          {/*              }} */}
          {/*              control="input" */}
          {/*            /> */}
          {/*            <button */}
          {/*              type="submit" */}
          {/*              onClick={() => editActiveStep(2)} */}
          {/*              disabled={formik.isValid} */}
          {/*            > */}
          {/*              Submit */}
          {/*            </button> */}
          {/*          </> */}
          {/*        )} */}
          {/*        {activeIndex === 2 && ( */}
          {/*          <> */}
          {/*            <FormikControl */}
          {/*              control="input" */}
          {/*              rest={{ */}
          {/*                placeholder: 'Attach CV', */}
          {/*                type: 'file', */}
          {/*                label: 'CV / Resume', */}
          {/*                name: 'resume', */}
          {/*              }} */}
          {/*            /> */}
          {/*            <FormikControl */}
          {/*              control="input" */}
          {/*              rest={{ */}
          {/*                placeholder: 'Attach CV', */}
          {/*                type: 'file', */}
          {/*                label: 'CV / Resume', */}
          {/*                name: 'resume', */}
          {/*              }} */}
          {/*            /> */}
          {/*            <button */}
          {/*              type="submit" */}
          {/*              onClick={() => editActiveStep(3)} */}
          {/*              disabled={!formik.isValid} */}
          {/*            > */}
          {/*              Submit */}
          {/*            </button> */}
          {/*          </> */}
          {/*        )} */}
          {/*        {activeIndex === 3 && ( */}
          {/*          <> */}
          {/*            <Success /> */}
          {/*          </> */}
          {/*        )} */}
          {/*      </Form> */}
          {/*    ); */}
          {/*  }} */}
          {/* </Formik> */}
        </div>
      </div>
    </section>
  );
};

export default JoinForm;
