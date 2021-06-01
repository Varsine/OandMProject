import React from 'react';
import usePortal from 'react-useportal';

import { IconHover } from 'components/index';

import styles from './Footer.scss';
import ModeSwitch from './ModeSwitch';
import SocialLinks from './SocialLinks';

import { MessengerIcon, MessengerHoverIcon } from '../../icons';

const Footer = () => {
  const { Portal } = usePortal();

  return (
    <Portal>
      <footer className={styles.wrapper}>
        <div className={styles.container}>
          <ModeSwitch />
          <SocialLinks />
          <IconHover
            isLink={false}
            icon={<MessengerIcon />}
            iconHover={<MessengerHoverIcon />}
            anchorProps={{
              target: '_blank',
              'aria-label': 'messenger',
            }}
          />
        </div>
      </footer>
    </Portal>
  );
};

export default Footer;
