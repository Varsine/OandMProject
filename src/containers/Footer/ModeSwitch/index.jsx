import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { activeIndexSelector } from 'slices/mainSlice';

import styles from './ModeSwitch.scss';

import Mouse from '../Mouse';

const ModeSwitch = ({ isOnePage }) => {
  const activeIndex = useSelector(activeIndexSelector);

  return (
    <div className={styles.wrapper}>
      {!isOnePage && (
        <>
          <h3 className={classNames(styles.index, styles.page_idx)}>
            {activeIndex}
          </h3>
          <Mouse />
        </>
      )}
    </div>
  );
};

ModeSwitch.propTypes = {
  isOpen: PropTypes.bool,
  isOnePage: PropTypes.bool.isRequired,
};

ModeSwitch.defaultProps = {
  isOpen: false,
};

export default ModeSwitch;
