import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';

import { Button } from 'components/index';
import { dropdownList } from 'utils/index';

import styles from './Apply.scss';
import Success from './Steps/Success';
import StepOne from './Steps/StepOne';
import StepTwo from './Steps/StepTwo';

import { StepIcon } from '../../../icons';

const JoinForm = () => {
  const [jobType, setJobType] = useState({
    text: dropdownList[0].text,
    jobIndex: 0,
  });
  const [activeIndex, setIsActiveIndex] = useState(1);

  const { control, register, formState, handleSubmit } = useForm({
    mode: 'onChange',
  });

  const submitValueHandler = (values) => {
    if (activeIndex === 1) {
      setIsActiveIndex(2);
    }
    // eslint-disable-next-line no-console
    console.log(values, 'form values');
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
                disabled={activeIndex === 1}
                onClick={() => editActiveStep(2)}
                className={classNames(styles.steps__item, {
                  [styles.steps__item_active]: activeIndex === 2,
                })}
              >
                2
              </Button>
            </div>
            <form ref={{}} onSubmit={handleSubmit(submitValueHandler)}>
              {activeIndex === 1 && (
                <StepOne
                  jobType={jobType}
                  register={register}
                  formState={formState}
                  changejobType={changejobType}
                />
              )}
              {activeIndex === 2 && (
                <StepTwo
                  control={control}
                  formState={formState}
                  register={register}
                />
              )}
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default JoinForm;
