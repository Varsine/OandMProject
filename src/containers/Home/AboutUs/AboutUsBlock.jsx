import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { NextImage } from 'components/index';
import { aboutUsInfoList } from 'utils/index';

import Modal from './Modal';
import styles from './AboutUs.scss';

const AboutUsBlock = ({ src, currentIndex, className, classRope }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handlerOpenPopup = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      <div className={classNames(styles.block, className)}>
        <div className={classNames(styles.block__rope, classRope)} />
        <div role="button" onClick={handlerOpenPopup}>
          <NextImage
            src={src}
            className={styles.block__image}
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
