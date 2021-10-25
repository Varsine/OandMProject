import React, { useRef } from 'react';
import usePortal from 'react-useportal';
import PropTypes from 'prop-types';

import { useOutsideClick, useLockBodyScroll } from 'hooks/index';

import styles from './Modal.scss';

const Modal = ({ data, setIsOpenModal }) => {
  const { Portal } = usePortal();
  const infoRef = useRef();
  const { title, subTitle, paragraph } = data;

  useOutsideClick(infoRef, () => setIsOpenModal(false));

  useLockBodyScroll();

  return (
    <Portal>
      <div className={styles.wrapper}>
        <div ref={infoRef} className={styles.info}>
          <h2 className={styles.info__title}>{title}</h2>
          <h4 className={styles.info__subtitle}>{subTitle}</h4>
          <p className={styles.info__text}>{paragraph}</p>
        </div>
      </div>
    </Portal>
  );
};

Modal.propTypes = {
  data: PropTypes.object,
  setIsOpenModal: PropTypes.func,
};

Modal.defaultProps = {
  data: {},
  setIsOpenModal: () => {},
};

export default Modal;
