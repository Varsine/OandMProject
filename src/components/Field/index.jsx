import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { dropdownList } from 'utils/index';
import { useOutsideClick } from 'hooks/index';

import styles from './Field.scss';

import Input from '../Input';
import { FileIcon, ArrowGdtIcon } from '../../icons';

const Field = ({ id, className, type, label, inputType, placeholder }) => {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setIsActiveIndex] = useState(0);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const openModalToggleer = () => {
    setIsOpen(!isOpen);
  };

  const changeActiveIndexHandler = (ix) => {
    setIsActiveIndex(ix);
    setIsOpen(false);
  };

  const renderDropDownList = dropdownList.map(({ id: idr, text }, index) => (
    <div
      key={idr}
      role="button"
      onClick={() => changeActiveIndexHandler(index)}
      className={classNames(styles.dropdown__content_item, {
        [styles.dropdown__content_item_active]: index === activeIndex,
      })}
    >
      {text}
    </div>
  ));

  if (type === 'file') {
    return (
      <div>
        <span className={styles.label}>{label}</span>
        <label htmlFor={id} className={styles.file}>
          <p className={styles.file__text}>Attach file</p>
          <Input
            id={id}
            type="file"
            className={styles.file__checked}
            placeholder={placeholder}
          />
          <FileIcon />
        </label>
        <p className={styles.message}>* required</p>
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
            <p>{dropdownList[activeIndex].text}</p>
            <ArrowGdtIcon
              style={{ transform: `rotate(${isOpen ? -90 : 90}deg)` }}
            />
          </div>
          {isOpen && (
            <div className={styles.dropdown__content}>{renderDropDownList}</div>
          )}
        </div>
        <p className={styles.message}>* required</p>
      </div>
    );
  }

  return (
    <div className={classNames(styles.text, className)}>
      <span className={styles.label}>{label}</span>
      <Input type={inputType} className={styles.text__change} />
      <p className={styles.message}>* required</p>
    </div>
  );
};

Field.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  inputType: PropTypes.string,
  placeholder: PropTypes.string,
};

Field.defaultProps = {
  id: null,
  type: 'text',
  label: '',
  className: '',
  inputType: 'text',
  placeholder: '',
};

export default Field;
