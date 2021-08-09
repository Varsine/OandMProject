/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { NextImage, Button } from 'components/index';
import { aboutUsList } from 'utils/index';
import { activeIndexSelector } from 'slices/mainSlice';

// eslint-disable-next-line no-unused-vars
import Item from './Item';
import styles from './AboutUs.scss';

const AboutUs = () => {
  const [isAnimate, setIsAnimate] = useState(false);
  const [prevItem, setPrevItem] = useState(0);
  const [activeItem, setActiveItem] = useState(0);
  const activeIndex = useSelector(activeIndexSelector);
  const isOpen = activeIndex === 2;

  useEffect(() => {
    if (isAnimate) {
      setTimeout(() => setIsAnimate(false), 2000);
    }
  }, [isAnimate]);

  const editActiveItemHandler = (e) => {
    setPrevItem(activeItem);
    setIsAnimate(true);
    setActiveItem(e);
  };

  const renderAboutPhotos = aboutUsList.map(({ id, url }, index) => (
    <div
      className={classNames(styles.photos__item, {
        [styles.photos__item_active]: index === 0,
      })}
      key={id}
    >
      <NextImage src={url} className={styles.photos__item_image} />
    </div>
  ));

  return (
    <section className="section">
      <div className={styles.wrapper}>
        <div className="canvas__working" />
        <div className={styles.info}>
          <h2 className={styles.info__title}>About Us</h2>
          <h4 className={styles.info__subtitle}>
            SHELLLOGIX LLC has been established in 2017 with a mission to offer
            creative solutions in the field of.
          </h4>
          <p className={styles.info__text}>
            We believe that contemporary ideas and technologies are the key
            milestones for creating strategic solutions for traditions based on
            businesses.
          </p>
        </div>
        <div className={styles.animation}>
          <div className={styles.photos}>
            <Button
              style={{ zIndex: 1 }}
              onClick={() => editActiveItemHandler(1)}
              disabled={isAnimate}
              className={classNames(styles.photos__item, {
                [styles.photos__item_open]: isOpen,
                [styles.photos__item_animate]: isAnimate,
              })}
            >
              <NextImage
                loading="eager"
                src="/images/aboutUs/2.png"
                className={styles.photos__item_image}
              />
            </Button>
            <Button
              style={{ zIndex: 2 }}
              onClick={() => editActiveItemHandler(2)}
              disabled={isAnimate}
              className={classNames(styles.photos__item, {
                [styles.photos__item_open]: isOpen,
                [styles.photos__item_animate]: isAnimate,
              })}
            >
              <NextImage
                loading="eager"
                src="/images/aboutUs/3.png"
                className={styles.photos__item_image}
              />
            </Button>
            <Button
              style={{ zIndex: 3 }}
              onClick={() => editActiveItemHandler(3)}
              disabled={isAnimate}
              className={classNames(styles.photos__item, {
                [styles.photos__item_open]: isOpen,
                [styles.photos__item_animate]: isAnimate,
              })}
            >
              <NextImage
                loading="eager"
                src="/images/aboutUs/4.png"
                className={styles.photos__item_image}
              />
            </Button>
            <Button
              style={{ zIndex: 4 }}
              onClick={() => editActiveItemHandler(4)}
              disabled={isAnimate}
              className={classNames(styles.photos__item, {
                [styles.photos__item_open]: isOpen,
                [styles.photos__item_animate]: isAnimate,
              })}
            >
              <NextImage
                loading="eager"
                src="/images/aboutUs/5.png"
                className={styles.photos__item_image}
              />
            </Button>
            <div style={{ zIndex: 1 }} className={styles.photos__item}>
              <NextImage
                loading="eager"
                src={aboutUsList[activeItem].url}
                className={styles.photos__item_image}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
