import React, { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { images } from 'utils/index';
import { useWindowSize } from 'hooks/index';
import { activeIndexSelector } from 'slices/mainSlice';

import styles from './AboutUs.scss';
import AboutUsBlock from './AboutUsBlock';

const AboutUs = () => {
  const { isDesktop } = useWindowSize();
  const activeIndex = useSelector(activeIndexSelector);
  const isOpen = activeIndex === 2;
  const [isShow, setIsShow] = useState(false);
  const [isTitle, setIsTitle] = useState(false);
  const [firstAnimation, setFirstAnimation] = useState(false);

  const showFirstAnimate = useMemo(
    () => (!isDesktop ? firstAnimation : isShow),
    [isDesktop, firstAnimation, isShow],
  );

  useEffect(() => {
    if (isOpen) {
      setIsTitle(true);
      setFirstAnimation(true);
    }

    setTimeout(() => {
      if (isOpen) {
        setIsShow(true);
      } else {
        setIsShow(false);
      }
    }, 1300);
  }, [isOpen]);

  const renderAboutBlock = useMemo(
    () =>
      showFirstAnimate
        ? images.map(({ src, imgClass, classRope }, idx) => (
            <AboutUsBlock
              key={src}
              src={src}
              className={imgClass}
              classRope={classRope}
              currentIndex={idx}
            />
          ))
        : null,
    [showFirstAnimate],
  );

  return (
    <section className={`${styles.height_responce} section`}>
      <div className="canvas__working" />
      <div className={`container ${styles.wrapper}`}>
        <div className={styles.wrapper__content}>
          <h1
            className={classNames(styles.wrapper__content__title, {
              [styles.wrapper__content__title_show]: isTitle,
            })}
          >
            <span className={styles.wrapper__content__title__text}>
              About Us
            </span>
            <span>
              SHELLLOGIX LLC has been established in 2017 with a mission to
              offer creative solutions in the field of.
            </span>
          </h1>
        </div>
        <div className={styles.wrapper__list}>{renderAboutBlock}</div>
      </div>
    </section>
  );
};

export default AboutUs;
