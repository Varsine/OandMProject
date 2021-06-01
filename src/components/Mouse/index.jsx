import React from 'react';
import usePortal from 'react-useportal';
import { useSelector } from 'react-redux';

import { modeSelector } from 'slices/mainSlice';

import styles from './Mouse.scss';

import { MouseIcon, MouseLightIcon } from '../../icons';

const Mouse = () => {
  const { Portal } = usePortal();
  const isDarkMode = useSelector(modeSelector);

  return (
    <Portal>
      <div className={styles.wrapper}>
        {isDarkMode ? <MouseIcon /> : <MouseLightIcon />}
      </div>
    </Portal>
  );
};

export default Mouse;
