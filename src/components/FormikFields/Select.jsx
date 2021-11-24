import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useOutsideClick } from 'hooks/index';

import styles from './Field.scss';

import { ArrowGdtIcon } from '~/src/icons';

const Select = ({
  label,
  field: { name, value },
  options,
  form: { setFieldValue },
}) => {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const openModalToggleer = () => {
    setIsOpen(!isOpen);
  };

  const renderDropDownList = options.map(({ key, value: optionValue }) => (
    <div
      key={key}
      role="button"
      onClick={() => {
        setFieldValue(name, optionValue);
        openModalToggleer();
      }}
      className={classNames(styles.dropdown__content_item, {
        [styles.dropdown__content_item_active]: optionValue === value,
      })}
    >
      {optionValue}
    </div>
  ));

  const dropdownContainer = classNames(styles.dropdown__wrapper, {
    [styles.dropdown__wrapper_active]: isOpen,
  });

  const dropdownHeader = classNames(styles.dropdown__header, {
    [styles.dropdown__header_active]: isOpen,
  });

  const selectAnimation = classNames({
    [styles.dropdown__header_icon]: isOpen,
  });

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <span className={styles.label}>{label}</span>
      <div className={dropdownContainer}>
        <div
          role="button"
          onClick={openModalToggleer}
          className={dropdownHeader}
        >
          <p>{value}</p>
          <ArrowGdtIcon
            style={{ transform: `rotate(${isOpen ? -90 : 90}deg)` }}
            className={selectAnimation}
          />
        </div>
        {isOpen && (
          <div className={styles.dropdown__content}>{renderDropDownList}</div>
        )}
      </div>
    </div>
  );
};

Select.propTypes = {
  name: PropTypes.string,
  form: PropTypes.object,
  field: PropTypes.object,
  label: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
};

Select.defaultProps = {
  form: {},
  name: '',
  label: '',
  field: {},
  options: [],
  placeholder: '',
};
export default Select;
