import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { mainSections } from 'utils/index';
import { useWindowSize } from 'hooks/index';
import { FullPageContext } from 'context/index';
import { activeIndexSelector } from 'slices/mainSlice';

import styles from './Mouse.scss';

import { MouseIcon } from '../../../icons';

const Item = ({ type, className }) => {
  const activeIndex = useSelector(activeIndexSelector);

  const { isMaxTablet } = useWindowSize();
  const { moveToSection } = useContext(FullPageContext);

  const moveToSectionHandler = () => {
    const moveToType = type === 'top' ? activeIndex - 1 : activeIndex + 1;
    moveToSection.moveTo(moveToType);
  };

  const rightMouseClasses = classNames(className, styles.mouse_right_dropping, {
    [styles.right_mouse_none]: activeIndex === 1,
  });

  const leftMouseClasses = classNames(className, styles.mouse_left_dropping, {
    [styles.left_mouse_none]: activeIndex === mainSections.length,
  });

  const mouseLeft = (
    <MouseIcon
      onClick={moveToSectionHandler}
      className={leftMouseClasses}
      aria-label={`scroll to ${type} `}
    />
  );

  const mouseRight = (
    <MouseIcon
      onClick={moveToSectionHandler}
      className={rightMouseClasses}
      aria-label={`scroll to ${type} `}
    />
  );

  const paginationResponseRender = type === 'top' ? mouseRight : mouseLeft;

  return isMaxTablet && paginationResponseRender;
};

Item.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Item;
