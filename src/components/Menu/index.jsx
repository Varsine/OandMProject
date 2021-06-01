import React, { useContext } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { menuLinks } from 'utils/index';
import { FullPageContext } from 'context/index';
import { activeIndexSelector } from 'slices/mainSlice';

import styles from './Menu.scss';

import { MenuIcon } from '../../icons';

const Menu = () => {
  const htmlFor = 'menu-open';
  const activeIndex = useSelector(activeIndexSelector);
  const { moveToSection } = useContext(FullPageContext);

  const mobeToSectionHandler = (index) => {
    moveToSection.moveTo(index);
  };

  const renderMenuLinks = menuLinks.map((item) => (
    <div
      role="button"
      key={item.id}
      className={classNames(styles.wrapper__item, {
        [styles.wrapper__item_active]: activeIndex === item.sectionIndex,
      })}
      onClick={() => mobeToSectionHandler(item.sectionIndex)}
    >
      <item.svg />
    </div>
  ));

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
      </label>
      <div />
      <div />
      {renderMenuLinks}
    </div>
  );
};

export default Menu;
