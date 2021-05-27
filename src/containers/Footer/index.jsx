import React from 'react';

import { ModeSwitch } from 'components/index';

import styles from './Footer.scss';

const Footer = () => {
  return (
    <footer className={styles.wrapper}>
      <div className={styles.container}>
        <ModeSwitch />
      </div>
    </footer>
  );
};

export default Footer;
