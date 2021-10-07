import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import {
  modeToggler,
  modeSelector,
  activeIndexSelector,
} from 'slices/mainSlice';
import { IconHover } from 'components/index';

import styles from './ModeSwitch.scss';

import Mouse from '../Mouse';
import { SunIcon, MoonIcon, SunHoverIcon, MoonHoverIcon } from '../../../icons';

const ModeSwitch = ({ isOnePage, isOpen }) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(modeSelector);
  const activeIndex = useSelector(activeIndexSelector);

  const modeToggleHandler = () => {
    dispatch(modeToggler());
  };

  const recastActiveIndex = useMemo(() => {
    if (activeIndex > 9) {
      return activeIndex;
    }

    return `0${activeIndex}`;
  }, [activeIndex]);

  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.wrapper__hide]: isOpen,
      })}
    >
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
      <h3 className={styles.index}>{recastActiveIndex}</h3>
      {!isOnePage && <Mouse />}
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
