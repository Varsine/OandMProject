import React, { useState } from 'react';
import classNames from 'classnames';

import styles from './Apply.scss';
import Success from './Success';
import StepOne from './StepOne';
import StepTwo from './StepTwo';

import Button from '../Button';
import { StepIcon } from '../../icons';

const Apply = () => {
  const [activeIndex, setIsActiveIndex] = useState(1);

  const editActiveStep = (step) => {
    setIsActiveIndex(step);
  };

  return (
    <section className="section">
      <div className="canvas__working" />
      <div className={styles.container}>
        {activeIndex === 3 ? (
          <Success />
        ) : (
          <div className={styles.wrapper}>
            <h1 className={styles.title}>Apply Now!</h1>
            <p className={styles.subtitle}>Submit your information here!</p>
            <div className={styles.steps}>
              <Button
                onClick={() => editActiveStep(1)}
                className={classNames(styles.steps__item, {
                  [styles.steps__item_active]: activeIndex === 1,
                })}
              >
                1
              </Button>
              <StepIcon />
              <Button
                onClick={() => editActiveStep(2)}
                className={classNames(styles.steps__item, {
                  [styles.steps__item_active]: activeIndex === 2,
                })}
              >
                2
              </Button>
            </div>
            {activeIndex === 1 && <StepOne />}
            {activeIndex === 2 && <StepTwo />}
          </div>
        )}
      </div>
    </section>
  );
};

export default Apply;
