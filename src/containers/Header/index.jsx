import React, { useContext } from 'react';
import usePortal from 'react-useportal';

import { Menu } from 'components/index';
import { FullPageContext } from 'context/index';

import styles from './Header.scss';

import { LogoIcon } from '../../icons';

const Header = () => {
  const { Portal } = usePortal();
  const { moveToSection } = useContext(FullPageContext);

  const moveToSectionTop = () => {
    moveToSection.moveTo(1);
  };

  return (
    <Portal>
      <header className={styles.wrapper}>
        <div className={styles.container}>
          <LogoIcon aria-label="logo" onClick={moveToSectionTop} />
          <Menu />
        </div>
      </header>
    </Portal>
  );
};

export default Header;
