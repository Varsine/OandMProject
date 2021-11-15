import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { useWindowSize } from 'hooks/index';
import { mainSections } from 'utils/index';
import { FullPageContext } from 'context/index';
import { activeIndexSelector } from 'slices/mainSlice';

import styles from './Mouse.scss';

import { MouseIcon } from '../../../icons';

const Item = ({ type, className }) => {
  const { isSaleListTablet } = useWindowSize();
  const activeIndex = useSelector(activeIndexSelector);
  const { moveToSection } = useContext(FullPageContext);

  const moveToSectionHandler = () => {
    const moveToType = type === 'top' ? activeIndex - 1 : activeIndex + 1;
    moveToSection.moveTo(moveToType);
  };

  const mouseRight =
    activeIndex > 1 ? (
      <MouseIcon
        onClick={moveToSectionHandler}
        className={className}
        aria-label={`scroll to ${type} `}
      />
    ) : null;
  const mouseLeft =
    activeIndex !== mainSections.length ? (
      <MouseIcon
        onClick={moveToSectionHandler}
        className={className}
        aria-label={`scroll to ${type} `}
      />
    ) : (
      <div className={styles.bottom_skt} />
    );

  const paginationResponceRender = type === 'top' ? mouseRight : mouseLeft;

  return isSaleListTablet && paginationResponceRender;
};

Item.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default Item;
