import React, { useRef, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Button } from 'components/index';
import { useLockBodyScroll } from 'hooks/index';
import { noop, stepTwoInitialValues, stepOneInitialValues } from 'utils/index';

import Success from './Steps/Success';
import StepOne from './Steps/StepOne';
import StepTwo from './Steps/StepTwo';
import styles from './Apply.scss';

import { StepIcon } from '../../../../icons';

const JoinForm = ({ isOpen, backHandler, joinForm }) => {
  const [applicationForm, setApplicationForm] = useState({
    stepFirst: stepOneInitialValues,
    stepSecond: stepTwoInitialValues,
  });

  useLockBodyScroll(!isOpen);

  const secondFormikRef = useRef(null);
  const [activeIndex, setIsActiveIndex] = useState(1);

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

  return (
    <div className={joinPortalClasses}>
      {activeIndex !== 3 && (
        <Button className={btnClasses} onClick={backHandler}>
          Back
        </Button>
      )}
      {activeIndex !== 3 && (
        <div className={styles.wrapper_anima}>
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
              disabled={activeIndex === 1}
              onClick={() => editActiveStep(2)}
              className={classNames(styles.steps__item, {
                [styles.steps__item_active]: activeIndex === 2,
              })}
            >
              2
            </Button>
          </div>
          {activeIndex === 1 && (
            <StepOne
              setApplicationForm={setApplicationForm}
              applicationForm={applicationForm}
              editActiveStep={editActiveStep}
            />
          )}
          {activeIndex === 2 && (
            <StepTwo
              formikRef={secondFormikRef}
              sendApplicationHandler={sendApplicationHandler}
              applicationForm={applicationForm}
              setApplicationForm={setApplicationForm}
              editActiveStep={editActiveStep}
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
  joinForm: false,
  isOpen: true,
  backHandler: noop,
};

export default JoinForm;

/* <h1 className={styles.title} <p className={styles.subtitle} */
