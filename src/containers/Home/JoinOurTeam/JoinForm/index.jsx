import React, { useRef, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Button } from 'components/index';
import { useLockBodyScroll } from 'hooks/index';
import { noop, stepTwoInitialValues, stepOneInitialValues } from 'utils/index';

import { Success, StepOne, StepTwo } from './Steps/index';
import styles from './Apply.scss';

const JoinForm = ({ isOpen, backHandler, joinForm }) => {
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

  const sendApplicationHandler = async (values) => {
    const formData = Object.keys(values).reduce((data, key) => {
      data.append(key, values[key]);
      return data;
    }, new FormData());
    formData.append('otherFile', undefined);
    await axios.post(
      'https://shelllogix-mail.herokuapp.com/messages',
      formData,
    );
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
    [styles.joinform_portal__anima__back_anima]: joinForm,
  });

  const joinPortalClasses = classNames(styles.joinform_portal, {
    [styles.joinform_portal__anima]: joinForm,
  });

  const stepsClasses = classNames(styles.wrapper_anima, {
    [styles.wrapper_anima_step_two]: activeIndex === 2,
  });

  return (
    <div className={joinPortalClasses}>
      {activeIndex !== 3 && (
        <div className={stepsClasses}>
          {activeIndex === 1 && (
            <StepOne
              handlePrevStep={handlePrevStep}
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
            />
          )}
        </div>
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
