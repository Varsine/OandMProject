import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import { Form, Formik, Field } from 'formik';

import { Button, FormikInput, FileUpload } from 'components/index';
import { stepTwoInitialValues, stepTwoValidationSchema } from 'utils/index';

import styles from '../Apply.scss';

const StepTwo = ({
  formikRef,
  editActiveStep,
  applicationForm,
  sendApplicationHandler,
}) => {
  const initialValues = useMemo(
    () =>
      !isEqual(stepTwoInitialValues, applicationForm.stepSecond)
        ? applicationForm.stepSecond
        : stepTwoInitialValues,
    [applicationForm],
  );

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={stepTwoValidationSchema}
      onSubmit={(values) => {
        sendApplicationHandler((prevForm) => ({
          ...prevForm,
          stepSecond: values,
        }));
        editActiveStep(3);
      }}
    >
      <Form className={styles.form_style} autoComplete="off">
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
          component={FormikInput}
        />
        <Field
          name="linkedInLink"
          label="LinkedIn link"
          placeholder="LinkedIn link"
          component={FormikInput}
        />
        <Button className={styles.next} type="submit">
          Submit
        </Button>
      </Form>
    </Formik>
  );
};

StepTwo.propTypes = {
  formikRef: PropTypes.any,
  editActiveStep: PropTypes.func,
  applicationForm: PropTypes.object,
  sendApplicationHandler: PropTypes.func,
};

StepTwo.defaultProps = {
  formikRef: {},
  editActiveStep: () => {},
  applicationForm: {},
  sendApplicationHandler: () => {},
};

export default StepTwo;
