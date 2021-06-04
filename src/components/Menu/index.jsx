import React, { useContext } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { menuLinks } from 'utils/index';
import { FullPageContext } from 'context/index';
import { modeSelector, activeIndexSelector } from 'slices/mainSlice';

import styles from './Menu.scss';

import { MenuIcon, CloseIcon } from '../../icons';

const Menu = () => {
  const htmlFor = 'menu-open';
  const isDarkMode = useSelector(modeSelector);
  const activeIndex = useSelector(activeIndexSelector);
  const { moveToSection } = useContext(FullPageContext);

  const mobeToSectionHandler = (index) => {
    moveToSection.moveTo(index);
  };

  const renderMenuLinks = menuLinks.map((item) => {
    const isActive = activeIndex === item.sectionIndex;
    const isIconActive = isActive ? <item.iconHover /> : <item.icon />;
    const isIconLightActive = isActive ? (
      <item.iconHover />
    ) : (
      <item.iconLight />
    );

    return (
      <div
        role="button"
        key={item.id}
        className={classNames(styles.wrapper__item, {
          [styles.wrapper__item_active]: isActive,
        })}
        onClick={() => mobeToSectionHandler(item.sectionIndex)}
      >
        {isDarkMode ? isIconActive : isIconLightActive}
        <item.iconHover />
      </div>
    );
  });

  return (
    <div className={styles.wrapper}>
      <input
        id={htmlFor}
        type="checkbox"
        href="#"
        name={htmlFor}
        className={styles.wrapper__open}
      />
      <label className={styles.wrapper__open_button} htmlFor={htmlFor}>
        <MenuIcon className={styles.wrapper__open} />
        <CloseIcon className={styles.wrapper__close} />
      </label>
      <div />
      <div />
      {renderMenuLinks}
    </div>
  );
};

export default Menu;
