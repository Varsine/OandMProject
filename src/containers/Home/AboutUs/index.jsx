import React, { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { useWindowSize } from 'hooks/index';
import { activeIndexSelector } from 'slices/mainSlice';
import { images, aboutUsInfoList } from 'utils/index';

import Modal from './Modal';
import styles from './AboutUs.scss';
import AboutUsBlock from './AboutUsBlock';

const AboutUs = () => {
  const { isDesktop } = useWindowSize();
  const activeIndex = useSelector(activeIndexSelector);
  const isOpen = activeIndex === 2;

  const [isShow, setIsShow] = useState(false);
  const [isTitle, setIsTitle] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [firstAnimation, setFirstAnimation] = useState(false);

  const showFirstAnimate = useMemo(
    () => (!isDesktop ? firstAnimation : isShow),
    [isDesktop, firstAnimation, isShow],
  );

  useEffect(() => {
    if (isOpen) {
      setIsTitle(true);
      setFirstAnimation(true);
    } else {
      setIsOpenModal(false);
    }

    setTimeout(() => {
      if (isOpen) {
        setIsShow(true);
      } else {
        setIsShow(false);
      }
    }, 300);
  }, [isOpen]);

  const handlerChange = (idx) => {
    setIsOpenModal(true);
    setCurrentIndex(idx);
  };

  const renderAboutBlock = useMemo(
    () =>
      showFirstAnimate
        ? images.map(({ src, imgClass, classRope }, idx) => (
            <AboutUsBlock
              key={src}
              src={src}
              className={imgClass}
              classRope={classRope}
              handlerChange={() => handlerChange(idx)}
            />
          ))
        : null,
    [showFirstAnimate],
  );

  const titleClass = useMemo(
    () =>
      classNames(styles.wrapper__content__title, {
        [styles.wrapper__content__title_show]: isTitle,
      }),
    [isTitle],
  );

  return (
    <section className={`${styles.height_response} section`}>
      <div className="canvas__working" />
      <div className={`container ${styles.wrapper}`}>
        <div className={styles.wrapper__content}>
          <h1 className={titleClass}>
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
      <div className={styles.modal_container}>
        <Modal
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          data={aboutUsInfoList[currentIndex]}
        />
      </div>
    </section>
  );
};

export default AboutUs;
