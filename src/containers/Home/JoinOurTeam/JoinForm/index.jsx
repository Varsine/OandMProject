import React, { useRef, useState } from 'react';
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

  const mergedObjects = {
    ...applicationForm.stepFirst,
    ...applicationForm.stepSecond,
  };

  const sendApplicationHandler = async () => {
    await axios.post(`http://192.168.31.151:5000/api/email`, mergedObjects);
    // .then((data) => console.log(data))
    // .catch((err) => console.log(err));
  };

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
