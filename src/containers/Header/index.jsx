import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import usePortal from 'react-useportal';

import { paths } from 'routes/index';
import { Menu, NextLink } from 'components/index';
import { FullPageContext } from 'context/index';

import styles from './Header.scss';

import { LogoIcon } from '../../icons';

const Header = ({ isOnePage }) => {
  const { Portal } = usePortal();
  const { moveToSection } = useContext(FullPageContext);

  const moveToSectionTop = () => {
    moveToSection.moveTo(1);
  };

  return (
    <Portal>
      <header className={styles.wrapper}>
        <div className={styles.container}>
          {!isOnePage ? (
            <LogoIcon aria-label="logo" onClick={moveToSectionTop} />
          ) : (
            <NextLink to={paths.home}>
              <LogoIcon aria-label="logo" />
            </NextLink>
          )}
          {!isOnePage && <Menu />}
        </div>
      </header>
    </Portal>
  );
};

Header.propTypes = {
  isOnePage: PropTypes.bool.isRequired,
};

export default Header;
