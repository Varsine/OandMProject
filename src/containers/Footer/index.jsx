import React from 'react';
import usePortal from 'react-useportal';

import { Chat } from 'components/index';

import styles from './Footer.scss';
import ModeSwitch from './ModeSwitch';
import SocialLinks from './SocialLinks';

const Footer = () => {
  const { Portal } = usePortal();

  return (
    <Portal>
      <footer className={styles.wrapper}>
        <div className={styles.container}>
          <ModeSwitch />
          <SocialLinks />
          <Chat />
        </div>
      </footer>
    </Portal>
  );
};

export default Footer;
