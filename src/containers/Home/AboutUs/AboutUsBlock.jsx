import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { QuestionOctagon } from '@styled-icons/bootstrap/QuestionOctagon';

import { NextImage } from 'components/index';
import { aboutUsInfoList } from 'utils/index';
import { activeIndexSelector } from 'slices/mainSlice';

import Modal from './Modal';
import styles from './AboutUs.scss';

const AboutUsBlock = ({ src, currentIndex, className, classRope }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const activeIndex = useSelector(activeIndexSelector);
  const isOpen = activeIndex === 2;

  const handlerOpenPopup = () => {
    setIsOpenModal(true);
  };

  useEffect(() => {
    if (!isOpen) {
      setIsOpenModal(false);
    }
  }, [isOpen]);

  return (
    <>
      <div className={classNames(styles.block, className)}>
        <div className={classNames(styles.block__rope, classRope)} />
        <div
          className={styles.block__img}
          role="button"
          onClick={handlerOpenPopup}
        >
          <div className={styles.block__img_wrapper}>
            <QuestionOctagon className={styles.block__img_wrapper_icon} />
          </div>
          <NextImage
            src={src}
            className={styles.block__img__image}
            loading="eager"
          />
        </div>
      </div>
      {isOpenModal && (
        <Modal
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          data={aboutUsInfoList[currentIndex]}
        />
      )}
    </>
  );
};

AboutUsBlock.propTypes = {
  src: PropTypes.string,
  classRope: PropTypes.string,
  className: PropTypes.string,
  currentIndex: PropTypes.number,
};

AboutUsBlock.defaultProps = {
  src: '',
  classRope: '',
  className: '',
  currentIndex: 0,
};

export default AboutUsBlock;
