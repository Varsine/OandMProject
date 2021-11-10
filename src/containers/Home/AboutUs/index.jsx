import React, { useState, useEffect } from 'react';
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
  const showFirstAnimate = !isDesktop ? firstAnimation : isShow;

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

  const renderAboutBlock = images.map(({ src, imgClass, classRope }, idx) => (
    <AboutUsBlock
      key={src}
      src={src}
      className={imgClass}
      classRope={classRope}
      currentIndex={idx}
    />
  ));

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
            <span>About Us</span>
            <span>
              SHELLLOGIX LLC has been established in 2017 with a mission to
              offer creative solutions in the field of.
            </span>
          </h1>
        </div>
        <div className={styles.wrapper__list}>
          {showFirstAnimate && renderAboutBlock}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
