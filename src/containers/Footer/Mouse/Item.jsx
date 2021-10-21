import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { mainSections } from 'utils/index';
import { FullPageContext } from 'context/index';
import { modeSelector, activeIndexSelector } from 'slices/mainSlice';

import styles from './Mouse.scss';

import { MouseIcon, MouseLightIcon } from '../../../icons';

const Item = ({ type, className }) => {
  const isDarkMode = useSelector(modeSelector);
  const activeIndex = useSelector(activeIndexSelector);
  const { moveToSection } = useContext(FullPageContext);

  const moveToSectionHandler = () => {
    const moveToType = type === 'top' ? activeIndex - 1 : activeIndex + 1;
    moveToSection.moveTo(moveToType);
  };

  const iconMode = isDarkMode ? (
    <MouseIcon
      onClick={moveToSectionHandler}
      className={className}
      aria-label={`scroll to ${type} `}
    />
  ) : (
    <MouseLightIcon
      onClick={moveToSectionHandler}
      className={className}
      aria-label={`scroll to ${type} `}
    />
  );

  const mouseRight = activeIndex > 1 ? iconMode : null;
  const mouseLeft =
    activeIndex !== mainSections.length ? (
      iconMode
    ) : (
      <div className={styles.bottom_skt} />
    );

  return type === 'top' ? mouseRight : mouseLeft;
};

Item.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default Item;
