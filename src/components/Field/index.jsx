import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import FileUploader from 'react-firebase-file-uploader';

import { dropdownList, noop } from 'utils/index';
import { useOutsideClick } from 'hooks/index';

import styles from './Field.scss';

import { FileIcon, ArrowGdtIcon } from '../../icons';

const Field = ({
  id,
  type,
  name,
  label,
  error,
  jobType,
  register,
  className,
  inputType,
  validation,
  placeholder,
  changejobType,
}) => {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setIsActiveIndex] = useState(0);
  const { message } = error;

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const openModalToggleer = () => {
    setIsOpen(!isOpen);
  };

  const changeActiveIndexHandler = (ix, text) => {
    setIsOpen(false);
    changejobType({
      text,
      jobIndex: ix,
    });
    setIsActiveIndex(ix);
  };

  const renderDropDownList = dropdownList.map(({ id: idr, text }, index) => (
    <div
      key={idr}
      role="button"
      onClick={() => changeActiveIndexHandler(index, text)}
      className={classNames(styles.dropdown__content_item, {
        [styles.dropdown__content_item_active]: index === activeIndex,
      })}
    >
      {text}
    </div>
  ));

  if (type === 'file') {
    return (
      <div className={styles.file__wrapper}>
        <span className={styles.label}>{label}</span>
        <label htmlFor={id} className={styles.file}>
          <p className={styles.file__text}>Attach file</p>
          <input
            id={id}
            type="file"
            className={styles.file__checked}
            placeholder={placeholder}
            {...register(name, validation)}
          />
          <FileIcon />
        </label>
        <p className={styles.message}>{message}</p>
      </div>
    );
  }

  if (type === 'dropdown') {
    return (
      <div ref={dropdownRef} className={styles.dropdown}>
        <span className={styles.label}>{label}</span>
        <div className={styles.dropdown__wrapper}>
          <div
            role="button"
            onClick={openModalToggleer}
            className={classNames(styles.dropdown__header, {
              [styles.dropdown__header_active]: isOpen,
            })}
          >
            <p>{jobType.text}</p>
            <ArrowGdtIcon
              style={{ transform: `rotate(${isOpen ? -90 : 90}deg)` }}
              className={classNames({ [styles.dropdown__header_icon]: isOpen })}
            />
          </div>
          {isOpen && (
            <div className={styles.dropdown__content}>{renderDropDownList}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={classNames(styles.text, className)}>
      <span className={styles.label}>{label}</span>
      <input
        type={inputType}
        className={styles.text__change}
        placeholder={placeholder}
        autoComplete="off"
        {...register(name, validation)}
      />
      <p className={styles.message}>{message}</p>
    </div>
  );
};

Field.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.object,
  jobType: PropTypes.object,
  register: PropTypes.func,
  className: PropTypes.string,
  inputType: PropTypes.string,
  validation: PropTypes.object,
  placeholder: PropTypes.string,
  changejobType: PropTypes.func,
};

Field.defaultProps = {
  id: null,
  name: '',
  type: 'text',
  label: '',
  error: {},
  jobType: {},
  register: noop,
  className: '',
  inputType: 'text',
  validation: {},
  placeholder: '',
  changejobType: noop,
};

export default Field;
