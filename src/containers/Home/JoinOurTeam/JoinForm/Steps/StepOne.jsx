import React, { useMemo } from 'react';
import { Field, Form, Formik } from 'formik';
import isEqual from 'lodash.isequal';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FormikInput, FormikSelect, Button } from 'components/index';
import {
  noop,
  dropdownOptions,
  stepOneInitialValues,
  stepOneValidationSchema,
} from 'utils/index';

import PhoneInput from '../PhoneInput';
import styles from '../Apply.scss';
import { StepIcon } from '../../../../../icons';

const StepOne = ({
  children,
  activeIndex,
  editActiveStep,
  handlePrevStep,
  applicationForm,
  setApplicationForm,
}) => {
  const initialValues = useMemo(
    () =>
      !isEqual(stepOneInitialValues, applicationForm.stepFirst)
        ? applicationForm.stepFirst
        : stepOneInitialValues,
    [applicationForm],
  );

  return (
    <>
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
          <div className={styles.steps}>
            <Button
              onClick={handlePrevStep}
              className={classNames(styles.steps__item, {
                [styles.steps__item_active]: activeIndex >= 1,
              })}
            >
              1
            </Button>
            <StepIcon className={styles.steps__line} />
            <Button
              type="submit"
              className={classNames(styles.steps__item, {
                [styles.steps__item_load]: activeIndex === 2,
              })}
            >
              2
            </Button>
          </div>
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
          <>{children}</>
        </Form>
      </Formik>
    </>
  );
};

StepOne.propTypes = {
  activeIndex: PropTypes.number,
  editActiveStep: PropTypes.func,
  handlePrevStep: PropTypes.func,
  applicationForm: PropTypes.object,
  children: PropTypes.any.isRequired,
  setApplicationForm: PropTypes.func,
};

StepOne.defaultProps = {
  activeIndex: 1,
  applicationForm: {},
  handlePrevStep: noop,
  editActiveStep: noop,
  setApplicationForm: noop,
};

export default StepOne;
