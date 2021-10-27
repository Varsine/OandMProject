import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import axios from 'axios';

import { Button } from 'components/index';
import { modeSelector } from 'slices/mainSlice';

import Success from './Steps/Success';
import StepOne from './Steps/StepOne';
import StepTwo from './Steps/StepTwo';
import PiecesAnimation from './PiecesAnimation';
import styles from './Apply.scss';

import { StepIcon } from '../../../icons';

const JoinForm = () => {
  const isDarkMode = useSelector(modeSelector);

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

  const animClickHanlder = () => {
    setRenderAnimation(true);
  };

  return (
    <section className="section">
      <div className={styles.container}>
        <PiecesAnimation
          isAnimate={renderAnimation}
          animClickHanlder={animClickHanlder}
        />
        <div
          style={{ marginTop: activeIndex === 3 ? 100 : 0 }}
          className={!renderAnimation ? styles.wrapper : styles.wrapper_anima}
        >
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
                <StepIcon className={isDarkMode || styles.steps__line} />
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
