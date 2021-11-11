import React, { useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import usePortal from 'react-useportal';
import classNames from 'classnames';

import { menuLinks } from 'utils/index';
import { FullPageContext } from 'context/index';
import { activeIndexSelector } from 'slices/mainSlice';

import styles from './SidebarMenu.scss';

const SidebarMenu = () => {
  const { Portal } = usePortal();
  const activeIndex = useSelector(activeIndexSelector);
  const { moveToSection } = useContext(FullPageContext);

  const mobeToSectionHandler = (index) => {
    moveToSection.moveTo(index);
  };

  const selectedLinks = useMemo(() => {
    const activeI = activeIndex - 1;

    const prevLink =
      activeI - 1 < 0
        ? menuLinks[menuLinks.length - 1]
        : menuLinks[activeI - 1];
    const beforePrevLink =
      activeI - 2 < 0
        ? menuLinks[menuLinks.length - Math.abs(activeI - 2)]
        : menuLinks[activeI - 2];
    const nextLink =
      activeI + 1 > menuLinks.length - 1
        ? menuLinks[0]
        : menuLinks[activeI + 1];
    const afterNextLink =
      activeI + 2 > menuLinks.length - 1
        ? menuLinks[activeI + 2 - menuLinks.length]
        : menuLinks[activeI + 2];

    return [
      beforePrevLink,
      prevLink,
      menuLinks[activeI],
      nextLink,
      afterNextLink,
    ];
  }, [activeIndex, menuLinks]);

  const renderMenuLinks = selectedLinks.map((item) => {
    const iconHover = <item.iconHover />;
    const isActive = activeIndex === item.sectionIndex;
    const isIconActive = isActive ? iconHover : <item.icon />;
    const wrapperClasses = classNames(styles.wrapper__item, {
      [styles.wrapper__item_active]: isActive,
    });

    return (
      <div
        role="button"
        key={item.id}
        className={wrapperClasses}
        onClick={() => mobeToSectionHandler(item.sectionIndex)}
      >
        {isIconActive}
      </div>
    );
  });

  return (
    <Portal>
      <div className={styles.wrapper}>{renderMenuLinks}</div>
    </Portal>
  );
};

export default SidebarMenu;
