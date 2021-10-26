import React, { useState } from 'react';
import classNames from 'classnames';
import axios from 'axios';

import { Button } from 'components/index';
import { applayImages } from 'utils/index';

import Success from './Steps/Success';
import StepOne from './Steps/StepOne';
import StepTwo from './Steps/StepTwo';
import styles from './Apply.scss';

import { ReactComponent as ImageCube } from '../../../../public/images/imagesss.svg';
import { StepIcon } from '../../../icons';

const JoinForm = () => {
  const [applicationForm, setApplicationForm] = useState({});
  const [activeIndex, setIsActiveIndex] = useState(1);
  const [renderAnimation, setRenderAnimation] = useState(false);

  const editActiveStep = (step) => {
    setIsActiveIndex(step);
  };

  const animationHAndler = () => {
    setRenderAnimation(false);
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

  const renderImage1 = applayImages.slice(0, 42).map(({ id }) => (
    <div className={styles.cut_images_containerTL__cubs} key={id}>
      <ImageCube style={{ width: '50px', height: '50px' }} />
    </div>
  ));

  const renderImage2 = applayImages.slice(42, 84).map(({ id }) => (
    <div
      className={styles.cut_images_containerTR__cubs}
      key={id}
      // style={{
      //   backgroundImage: bgImage,
      // }}
    >
      <ImageCube style={{ width: '50px', height: '50px' }} />
    </div>
  ));

  const renderImage3 = applayImages.slice(84, 126).map(({ id }) => (
    <div
      className={styles.cut_images_containerBL__cubs}
      key={id}
      // style={{
      //   backgroundImage: bgImage,
      // }}
    >
      <ImageCube style={{ width: '50px', height: '50px' }} />
    </div>
  ));

  const renderImage4 = applayImages.slice(126, 168).map(({ id }) => (
    <div className={styles.cut_images_containerBR__cubs} key={id}>
      <ImageCube style={{ width: '50px', height: '50px' }} />
    </div>
  ));

  return (
    <section className="section">
      <div
        type="submit"
        role="button"
        onClick={animationHAndler}
        className={styles.container}
      >
        {!renderAnimation ? (
          <div className={styles.cut_images}>
            <span className={styles.cut_images_containerTL}>
              {renderImage1}
            </span>
            <span className={styles.cut_images_containerTR}>
              {renderImage2}
            </span>
            <span className={styles.cut_images_containerBL}>
              {renderImage3}
            </span>
            <span className={styles.cut_images_containerBR}>
              {renderImage4}
            </span>
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
};

export default JoinForm;
