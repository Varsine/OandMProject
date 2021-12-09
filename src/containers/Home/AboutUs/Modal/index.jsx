import React, { useRef } from 'react';
import usePortal from 'react-useportal';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useOutsideClick, useLockBodyScroll } from 'hooks/index';

import styles from './Modal.scss';

const Modal = ({ data, setIsOpenModal, isOpenModal }) => {
  const { Portal } = usePortal();
  const infoRef = useRef(null);
  const { title, subTitle, paragraph } = data;

  useOutsideClick(infoRef, () => {
    if (isOpenModal) {
      setIsOpenModal(false);
    }
  });

  useLockBodyScroll();

  const wrapperClasses = classNames(styles.wrapper, {
    [styles.wrapper__open]: isOpenModal,
  });

  const innerInfoClasses = classNames(styles.info, {
    [styles.info__open]: isOpenModal,
  });

  return (
    <Portal>
      <div role="button" className={wrapperClasses}>
        <div ref={infoRef} className={innerInfoClasses}>
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
  isOpenModal: PropTypes.bool,
  setIsOpenModal: PropTypes.func,
};

Modal.defaultProps = {
  data: {},
  isOpenModal: false,
  setIsOpenModal: () => {},
};

export default Modal;
