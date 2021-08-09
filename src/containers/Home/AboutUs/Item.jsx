import React from 'react';
import classNames from 'classnames';

import { NextImage, Button } from 'components/index';

import styles from './AboutUs.scss';

const Item = ({ url, index, isOpen, isAnimate, editActiveItemHandler }) => {
  return (
    <Button
      role="button"
      style={{ zIndex: index }}
      onClick={() => editActiveItemHandler(index)}
      disabled={isAnimate}
      className={classNames(styles.photos__item, {
        [styles.photos__item_open]: isOpen,
        [styles.photos__item_animate]: isAnimate,
      })}
    >
      <NextImage
        loading="eager"
        src={url}
        className={styles.photos__item_image}
      />
    </Button>
  );
};

export default Item;
