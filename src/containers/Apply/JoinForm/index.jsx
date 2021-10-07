import React, { useState } from 'react';
import classNames from 'classnames';

import { Button } from 'components/index';
import Success from 'containers/Apply/JoinForm/Steps/Success';

import StepOne from './Steps/StepOne';
import StepTwo from './Steps/StepTwo';
import styles from './Apply.scss';

import { StepIcon } from '../../../icons';

const JoinForm = () => {
  const [activeIndex, setIsActiveIndex] = useState(1);
  const editActiveStep = (step) => {
    setIsActiveIndex(step);
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
          {activeIndex === 1 && <StepOne editActiveStep={editActiveStep} />}
          {activeIndex === 2 && <StepTwo editActiveStep={editActiveStep} />}
          {activeIndex === 3 && <Success />}
        </div>
      </div>
    </section>
  );
};

export default JoinForm;
