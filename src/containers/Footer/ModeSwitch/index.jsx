import React from 'react';

import styles from './ModeSwitch.scss';

import { SunIcon } from '../../../icons';

const ModeSwitch = () => {
  return (
    <div className={styles.wrapper}>
      <SunIcon />
      <h3 className={styles.index}>01</h3>
    </div>
  );
};

export default ModeSwitch;
