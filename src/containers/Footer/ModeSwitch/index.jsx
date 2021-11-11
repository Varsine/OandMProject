import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { activeIndexSelector } from 'slices/mainSlice';

import styles from './ModeSwitch.scss';

import Mouse from '../Mouse';

const ModeSwitch = ({ isOnePage }) => {
  const activeIndex = useSelector(activeIndexSelector);

  const recastActiveIndex = useMemo(() => {
    if (activeIndex > 9) {
      return activeIndex;
    }

    return `${activeIndex}`;
  }, [activeIndex]);

  return (
    <div className={styles.wrapper}>
      {!isOnePage && (
        <>
          <h3 className={styles.index}>{recastActiveIndex}</h3>
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
