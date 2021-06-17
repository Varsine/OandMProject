import React from 'react';

import styles from './Main.scss';

import { LogoLargeIcon } from '../../../icons';

const Main = () => {
  return (
    <section id="header" className="section">
      <div className="canvas__working" />
      <div className={styles.wrapper}>
        <LogoLargeIcon />
      </div>
    </section>
  );
};

export default Main;
