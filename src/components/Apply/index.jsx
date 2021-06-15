import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';

import { dropdownList } from 'utils/index';

import styles from './Apply.scss';
import Success from './Success';
import StepOne from './StepOne';
import StepTwo from './StepTwo';

import Button from '../Button';
import { StepIcon } from '../../icons';

const Apply = () => {
  const [jobType, setJobType] = useState({
    text: dropdownList[0].text,
    jobIndex: 0,
  });
  const [activeIndex, setIsActiveIndex] = useState(1);

  const { register, formState, handleSubmit } = useForm({
    mode: 'onChange',
  });

  const submitValueHandler = (values) => {
    if (activeIndex === 1) {
      setIsActiveIndex(2);
    }

    console.log(values);
  };

  const editActiveStep = (step) => {
    setIsActiveIndex(step);
  };

  const changejobType = (job) => {
    setJobType(job);
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
                  [styles.steps__item_active]: activeIndex >= 1,
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
            <form onSubmit={handleSubmit(submitValueHandler)}>
              {activeIndex === 1 && (
                <StepOne
                  jobType={jobType}
                  register={register}
                  formState={formState}
                  changejobType={changejobType}
                />
              )}
              {activeIndex === 2 && (
                <StepTwo formState={formState} register={register} />
              )}
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default Apply;
