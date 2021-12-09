import React from 'react';

import Item from './Item';
import styles from './Mouse.scss';

const Mouse = () => (
  <div className={styles.wrapper}>
    <Item type="bottom" className={styles.wrapper__bottom} />
    <Item type="top" className={styles.wrapper__top} />
  </div>
);

export default Mouse;
