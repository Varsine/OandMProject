import React, { useCallback, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import usePortal from 'react-useportal';
import { useDispatch } from 'react-redux';

import { paths } from 'routes/index';
import { NextLink, Button } from 'components/index';
import { FullPageContext } from 'context/index';
import { changeIndex } from 'slices/mainSlice';

import styles from './Header.scss';

import { LogoIcon } from '../../icons';

const Header = ({ isOnePage }) => {
  const dispatch = useDispatch();

  const { Portal } = usePortal();
  const { moveToSection } = useContext(FullPageContext);

  const moveToSectionTop = useCallback(() => {
    moveToSection.moveTo(1);
  }, [moveToSection]);

  const setInitialIndex = () => {
    dispatch(changeIndex(1));
  };

  const logo = useMemo(
    () =>
      isOnePage ? (
        <NextLink to={paths.home}>
          <LogoIcon />
        </NextLink>
      ) : (
        <LogoIcon aria-label="logo" onClick={moveToSectionTop} />
      ),
    [isOnePage, moveToSectionTop],
  );
  const menuItems = [
    {
      id: 1,
      name: 'Home',
    },
    {
      id: 2,
      name: 'About Us',
    },
    {
      id: 3,
      name: 'Our work',
    },
    {
      id: 4,
      name: 'Partners',
    },
  ];

  const renderNavbarItems = menuItems.map((el) => (
    <Button
      key={`menuItems${el.id}`}
      className={styles.container__navbar__item}
    >
      {el.name}
    </Button>
  ));

  return (
    <Portal>
      <header className={styles.wrapper}>
        {/* Added <h1> for SEO optimization */}
        <h1 className={styles.global_title}>O&M</h1>
        <div className={styles.container}>
          <div role="button" onClick={setInitialIndex} className={styles.logo}>
            {logo}
          </div>
          <nav className={styles.container__navbar}>{renderNavbarItems}</nav>
        </div>
      </header>
    </Portal>
  );
};

Header.propTypes = {
  isOnePage: PropTypes.bool,
};
Header.defaultProps = {
  isOnePage: false,
};

export default Header;
