import React from 'react';
import PropTypes from 'prop-types';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';

import Input from 'components/FormikFields/Input';
import FileUpload from 'components/FormikFields/FileUpload';
import styles from 'containers/Apply/JoinForm/Apply.scss';

const StepTwo = ({
  editActiveStep,
  applicationForm,
  sendApplicationHandler,
}) => {
  const initialValues = {
    resume: '',
    coverLetter: '',
    githubLink: '',
    linkedInLink: '',
  };

  const validationSchema = Yup.object({
    resume: Yup.string().required('* required'),
    coverLetter: Yup.string().required('* required'),
    githubLink: Yup.string().matches(
      '/^https:\\/\\/github\\.com\\/.*$/gim',
      'Invalid GitHub link',
    ),
    linkedInLink: Yup.string().matches(
      '/^https:\\/\\/[a-z]{2,3}\\.linkedin\\.com\\/.*$/gim',
      'Invalid LinkedIn link',
    ),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        sendApplicationHandler({ ...applicationForm, ...values });
        editActiveStep(3);
      }}
    >
      {() => (
        <Form>
          <Field
            name="resume"
            label="Attach resume"
            placeholder="Attach file"
            component={FileUpload}
          />
          <Field
            name="coverLetter"
            label="Attach cover letter"
            placeholder="Cover letter"
            component={FileUpload}
          />
          <Field
            name="githubLink"
            label="Github link"
            placeholder="Github link"
            component={Input}
          />
          <Field
            name="linkedInLink"
            label="LinkedIn link"
            placeholder="LinkedIn link"
            component={Input}
          />
          <button className={styles.next} type="submit">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

StepTwo.propTypes = {
  editActiveStep: PropTypes.func,
  applicationForm: PropTypes.object,
  sendApplicationHandler: PropTypes.func,
};
StepTwo.defaultProps = {
  editActiveStep: () => {},
  applicationForm: {},
  sendApplicationHandler: () => {},
};

export default StepTwo;
