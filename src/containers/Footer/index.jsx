import React from 'react';

import { IconHover } from 'components/index';

import styles from './Footer.scss';
import ModeSwitch from './ModeSwitch';
import SocialLinks from './SocialLinks';

import { MessengerIcon, MessengerHoverIcon } from '../../icons';

const Footer = () => {
  return (
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
  );
};

export default Footer;
