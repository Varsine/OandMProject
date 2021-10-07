import React, { useState } from 'react';
import classNames from 'classnames';

import { Button } from 'components/index';
import Success from 'containers/Apply/JoinForm/Steps/Success';

import StepOne from './Steps/StepOne';
import StepTwo from './Steps/StepTwo';
import styles from './Apply.scss';

import { StepIcon } from '../../../icons';

const JoinForm = () => {
  const [applicationForm, setApplicationForm] = useState({});
  const [activeIndex, setIsActiveIndex] = useState(1);
  const editActiveStep = (step) => {
    setIsActiveIndex(step);
  };

  const sendApplicationHandler = async (values) => {
    const formData = new FormData();
    formData.append('jobType', values.jobType);
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('email', values.email);
    formData.append('phone', values.phone);
    formData.append('resume', values.resume);
    formData.append('coverLetter', values.coverLetter);
    formData.append('githubLink', values.githubLink);
    formData.append('linkedInLink', values.linkedInLink);
  };

  return (
    <section className="section">
      {/* <div className="canvas__working" /> */}
      <div className={styles.container}>
        <div
          style={{ marginTop: activeIndex === 3 ? 100 : 0 }}
          className={styles.wrapper}
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
                <StepIcon />
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
