import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  modeToggler,
  modeSelector,
  activeIndexSelector,
} from 'slices/mainSlice';
import { Mouse, IconHover } from 'components/index';

import styles from './ModeSwitch.scss';

import { SunIcon, MoonIcon, SunHoverIcon, MoonHoverIcon } from '../../../icons';

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
        <IconHover
          isLink={false}
          icon={<SunIcon />}
          iconHover={<SunHoverIcon />}
          onClick={modeToggleHandler}
          anchorProps={{
            'aria-label': 'light mode',
          }}
        />
      ) : (
        <IconHover
          isLink={false}
          icon={<MoonIcon />}
          iconHover={<MoonHoverIcon />}
          onClick={modeToggleHandler}
          anchorProps={{
            'aria-label': 'dark mode',
          }}
        />
      )}
      <h3 className={styles.index}>0{activeIndex}</h3>
      <Mouse />
    </div>
  );
};

export default ModeSwitch;
