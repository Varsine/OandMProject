import React from 'react';
import PropTypes from 'prop-types';
import usePortal from 'react-useportal';

import { Chat } from 'components/index';

import styles from './Footer.scss';
import ModeSwitch from './ModeSwitch';
import SocialLinks from './SocialLinks';

const Footer = ({ isOnePage }) => {
  const { Portal } = usePortal();

  return (
    <Portal>
      <footer className={styles.wrapper}>
        <div className={styles.container}>
          <ModeSwitch isOnePage={isOnePage} />
          <SocialLinks />
          <Chat />
        </div>
      </footer>
    </Portal>
  );
};

Footer.propTypes = {
  isOnePage: PropTypes.bool.isRequired,
};

export default Footer;
