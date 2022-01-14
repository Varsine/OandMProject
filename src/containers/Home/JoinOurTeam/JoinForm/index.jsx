import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Button } from 'components/index';
import { useLockBodyScroll } from 'hooks/index';
import { noop, stepTwoInitialValues, stepOneInitialValues } from 'utils/index';

import { Success, StepOne, StepTwo } from './Steps/index';
import styles from './Apply.scss';

const JoinForm = ({ isOpen, backHandler }) => {
  const [applicationForm, setApplicationForm] = useState({
    stepFirst: stepOneInitialValues,
    stepSecond: stepTwoInitialValues,
  });
  const [activeIndex, setIsActiveIndex] = useState(1);

  useLockBodyScroll(!isOpen);

  const secondFormikRef = useRef(null);

  const editActiveStep = (step) => {
    setIsActiveIndex(step);
  };

  const sendApplicationHandler = async () => {
    const formData = new FormData();

    const mergedObjects = {
      ...applicationForm.stepFirst,
      ...applicationForm.stepSecond,
    };

    formData.append('email', mergedObjects.email);
    formData.append('firstName', mergedObjects.firstName);
    formData.append('lastName', mergedObjects.lastName);
    formData.append('jobType', mergedObjects.jobType);
    formData.append('phoneNumber', mergedObjects.phoneNumber);
    formData.append('resume', mergedObjects.resume);
    formData.append('coverLetter', mergedObjects.coverLetter);
    formData.append('githubLink', mergedObjects.githubLink);
    formData.append('linkedInLink', mergedObjects.linkedInLink);

    await axios.post(`http://192.168.31.151:5000/api/email`, formData);
  };

  useEffect(() => {
    const { resume, coverLetter } = applicationForm.stepSecond;

    if ((resume, coverLetter)) {
      sendApplicationHandler();
    }
  }, [applicationForm]);

  const handlePrevStep = () => {
    if (activeIndex !== 1) {
      editActiveStep(1);
      setApplicationForm((prevForm) => ({
        ...prevForm,
        stepSecond: secondFormikRef.current.values,
      }));
    }
  };

  const btnClasses = classNames(styles.joinform_portal__back, {
    [styles.joinform_portal__anima__back_anima]: isOpen,
  });

  const joinPortalClasses = classNames(styles.joinform_portal, {
    [styles.joinform_portal__anima]: isOpen,
  });

  return (
    <div className={joinPortalClasses}>
      {activeIndex === 1 && (
        <StepOne
          editActiveStep={editActiveStep}
          applicationForm={applicationForm}
          setApplicationForm={setApplicationForm}
        >
          {activeIndex === 1 && (
            <Button className={btnClasses} onClick={backHandler}>
              Cancel
            </Button>
          )}
        </StepOne>
      )}
      {activeIndex === 2 && (
        <StepTwo
          activeIndex={activeIndex}
          formikRef={secondFormikRef}
          handlePrevStep={handlePrevStep}
          editActiveStep={editActiveStep}
          applicationForm={applicationForm}
          setApplicationForm={setApplicationForm}
          sendApplicationHandler={sendApplicationHandler}
          stepTwoValidationSchema={applicationForm.stepFirst}
        />
      )}
      {activeIndex === 3 && <Success doneSummary={backHandler} />}
    </div>
  );
};

JoinForm.propTypes = {
  isOpen: PropTypes.bool,
  joinForm: PropTypes.bool,
  backHandler: PropTypes.func,
};

JoinForm.defaultProps = {
  isOpen: true,
  joinForm: false,
  backHandler: noop,
};

export default JoinForm;
