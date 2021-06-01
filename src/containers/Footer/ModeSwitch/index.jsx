import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  modeToggler,
  modeSelector,
  activeIndexSelector,
} from 'slices/mainSlice';

import styles from './ModeSwitch.scss';

import { SunIcon, MoonIcon } from '../../../icons';

const ModeSwitch = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(modeSelector);
  const activeIndex = useSelector(activeIndexSelector);

  const modeToggleHandler = () => {
    dispatch(modeToggler());
  };

  return (
    <div className={styles.wrapper}>
      {isDarkMode ? (
        <SunIcon
          onClick={modeToggleHandler}
          className="test"
          aria-label="light mode"
        />
      ) : (
        <MoonIcon onClick={modeToggleHandler} aria-label="dark mode" />
      )}
      <h3 className={styles.index}>0{activeIndex}</h3>
    </div>
  );
};

export default ModeSwitch;
