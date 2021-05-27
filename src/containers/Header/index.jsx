import React from 'react';

import { paths } from 'routes/index';
import { NextLink } from 'components/index';

import styles from './Header.scss';

import { LogoIcon, MenuIcon } from '../../icons';

const Header = () => {
  return (
    <header className={styles.wrapper}>
      <div className={styles.container}>
        <NextLink to={paths.home} className={styles.logo}>
          <LogoIcon />
        </NextLink>
        <MenuIcon />
      </div>
    </header>
  );
};

export default Header;
