import React, { useState } from 'react';
import classNames from 'classnames';
import axios from 'axios';

import { Button } from 'components/index';

import Success from './Steps/Success';
import StepOne from './Steps/StepOne';
import StepTwo from './Steps/StepTwo';
import PiecesAnimation from './PiecesAnimation';
import styles from './Apply.scss';

import { StepIcon } from '../../../icons';

const JoinForm = () => {
  const [applicationForm, setApplicationForm] = useState({});
  const [activeIndex, setIsActiveIndex] = useState(1);
  const [renderAnimation, setRenderAnimation] = useState(false);

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

  const formContainers = classNames(styles.wrapper, {
    [styles.wrapper_anima]: renderAnimation,
  });

  const animClickHanlder = () => {
    setRenderAnimation(true);
  };

  return (
    <section className={`${styles.height_response} section`}>
      <div className="canvas__working" />
      <div className={styles.container}>
        <PiecesAnimation
          isAnimate={renderAnimation}
          animClickHanlder={animClickHanlder}
        />
        <div className={formContainers}>
          <h1 className={styles.title}>Apply Now!</h1>
          {activeIndex !== 3 && (
            <div>
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
              sendApplicationHandler={sendApplicationHandler}
              applicationForm={applicationForm}
              setApplicationForm={setApplicationForm}
              editActiveStep={editActiveStep}
            />
          )}
          {activeIndex === 3 && <Success />}
        </div>
      </div>
    </section>
  );
};

export default JoinForm;
