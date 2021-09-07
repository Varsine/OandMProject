/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import usePortal from 'react-useportal';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { Chat } from 'components/index';
import { modeSelector } from 'slices/mainSlice';
import { useWindowSize } from 'hooks/index';

import styles from './Footer.scss';
import ModeSwitch from './ModeSwitch';
import SocialLinks from './SocialLinks';

import { ArrowGdtIcon, CrossIcon } from '../../icons';

const Footer = ({ isOnePage }) => {
  const isDarkMode = useSelector(modeSelector);
  const { Portal } = usePortal();
  const { isMobile } = useWindowSize();
  const [isOpenIcons, setIsOpenIcons] = useState(false);

  const handleOpenIcons = () => setIsOpenIcons(!isOpenIcons);

  const iconsGroup = isOpenIcons || !isMobile ? <SocialLinks /> : null;

  return (
    <Portal>
      <footer className={styles.wrapper}>
        <div
          className={classNames(styles.container, {
            [styles.container_opened_icon]: isOpenIcons && isMobile,
          })}
        >
          {(!isOpenIcons || !isMobile) && <ModeSwitch isOnePage={isOnePage} />}
          {iconsGroup}
          <div className={styles.wrapper__arrow_block}>
            {isMobile &&
              (!isOpenIcons ? (
                <ArrowGdtIcon
                  className={classNames(styles.wrapper__arrow_icon, {
                    [styles.wrapper__arrow_icon_dark]: isDarkMode,
                  })}
                  onClick={handleOpenIcons}
                />
              ) : (
                <CrossIcon
                  className={isDarkMode && styles.wrapper__arrow_icon_dark}
                  onClick={handleOpenIcons}
                />
              ))}

            {(!isOpenIcons || !isMobile) && <Chat />}
          </div>
        </div>
      </footer>
    </Portal>
  );
};

Footer.propTypes = {
  isOnePage: PropTypes.bool.isRequired,
};

export default Footer;
