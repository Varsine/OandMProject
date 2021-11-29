import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import axios from 'axios';

import { Button } from 'components/index';
import { stepTwoInitialValues, stepOneInitialValues } from 'utils/index';

import Success from './Steps/Success';
import StepOne from './Steps/StepOne';
import StepTwo from './Steps/StepTwo';
// import PiecesAnimation from './PiecesAnimation';
import styles from './Apply.scss';

import { StepIcon } from '../../../../icons';

const JoinForm = () => {
  const [applicationForm, setApplicationForm] = useState({
    stepFirst: stepOneInitialValues,
    stepSecond: stepTwoInitialValues,
  });

  const secondFormikRef = useRef(null);
  const [activeIndex, setIsActiveIndex] = useState(1);
  // const [renderAnimation, setRenderAnimation] = useState(false);

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

  // const formContainers = classNames(styles.wrapper, {
  //   [styles.wrapper_anima]: renderAnimation,
  // });

  // const animClickHanlder = () => {
  //   setRenderAnimation(true);
  // };

  const handlePrevStep = () => {
    if (activeIndex !== 1) {
      editActiveStep(1);
      setApplicationForm((prevForm) => ({
        ...prevForm,
        stepSecond: secondFormikRef.current.values,
      }));
    }
  };

  return (
    <div className={styles.container}>
      {/* <PiecesAnimation
        isAnimate={renderAnimation}
        animClickHanlder={animClickHanlder}
      /> */}
      <div className={styles.wrapper_anima}>
        {activeIndex !== 3 && (
          <div>
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
          </div>
        )}
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
        {activeIndex === 3 && <Success />}
      </div>
    </div>
  );
};

export default JoinForm;

/* <h1 className={styles.title} <p className={styles.subtitle} */
