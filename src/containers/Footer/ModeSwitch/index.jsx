import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import {
  modeToggler,
  modeSelector,
  activeIndexSelector,
} from 'slices/mainSlice';
import { Mouse, IconHover } from 'components/index';

import styles from './ModeSwitch.scss';

import { SunIcon, MoonIcon, SunHoverIcon, MoonHoverIcon } from '../../../icons';

const ModeSwitch = ({ isOnePage }) => {
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
          id="siteMode"
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
          id="siteMode"
          isLink={false}
          icon={<MoonIcon />}
          iconHover={<MoonHoverIcon />}
          onClick={modeToggleHandler}
          anchorProps={{
            'aria-label': 'dark mode',
          }}
        />
      )}
      <h3 className={styles.index}>{activeIndex}</h3>
      {!isOnePage && <Mouse />}
    </div>
  );
};

ModeSwitch.propTypes = {
  isOnePage: PropTypes.bool.isRequired,
};

export default ModeSwitch;
