import React from 'react';
import PropTypes from 'prop-types';
import { Form, Formik, Field } from 'formik';

import Input from 'components/FormikFields/Input';
import Button from 'components/Button';
import FileUpload from 'components/FormikFields/FileUpload';

import {
  stepTwoInitialValues,
  stepTwoValidationSchema,
} from './JoinFormConstants';

import styles from '../Apply.scss';

const StepTwo = ({
  editActiveStep,
  applicationForm,
  sendApplicationHandler,
}) => {
  return (
    <Formik
      initialValues={stepTwoInitialValues}
      validationSchema={stepTwoValidationSchema}
      onSubmit={(values) => {
        sendApplicationHandler({ ...applicationForm, ...values });
        editActiveStep(3);
      }}
    >
      {() => (
        <Form autoComplete="off">
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
          <Button className={styles.next} type="submit">
            Submit
          </Button>
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
