import React, { useState } from 'react';
import PropTypes from 'prop-types';
import usePortal from 'react-useportal';

import { useWindowSize } from 'hooks/index';

import Chat from './Chat';
import ModeSwitch from './ModeSwitch';
import SocialLinks from './SocialLinks';
//
import styles from './Footer.scss';

import { CrossIcon } from '../../icons';

const Footer = ({ isOnePage }) => {
  const { Portal } = usePortal();
  const { isMobile } = useWindowSize();
  const [isOpen, setIsOpen] = useState(false);

  const isOpenHandler = () => setIsOpen(!isOpen);

  return (
    <Portal>
      <footer className={styles.wrapper}>
        {isMobile && (
          <div
            className={`${styles.wrapper__animation} 
            ${isOpen ? styles.wrapper__animation_active : null}`}
          >
            <SocialLinks />
            <CrossIcon
              onClick={isOpenHandler}
              className={styles.wrapper__animation_close}
              aria-label="close social links"
            />
          </div>
        )}
        <div className={styles.container}>
          <ModeSwitch isOpen={isOpen} isOnePage={isOnePage} />
          {!isMobile && <SocialLinks />}
          <Chat isOpenHandler={isOpenHandler} isOpen={isOpen} />
        </div>
      </footer>
    </Portal>
  );
};

Footer.propTypes = {
  isOnePage: PropTypes.bool,
};

Footer.defaultProps = {
  isOnePage: false,
};

export default Footer;
