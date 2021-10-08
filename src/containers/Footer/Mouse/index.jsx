import React from 'react';

import Item from './Item';
import styles from './Mouse.scss';

const Mouse = () => (
  <div className={styles.wrapper}>
    <Item type="bottom" className={styles.bottom} />
    <Item type="top" className={styles.top} />
  </div>
);

export default Mouse;
