import React, { useContext, useMemo } from 'react';
import usePortal from 'react-useportal';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { menuLinks } from 'utils/index';
import FullPageContext from 'context/FullPage';
import { activeIndexSelector, modeSelector } from 'slices/mainSlice';

import styles from './SidebarMenu.scss';

const SidebarMenu = () => {
  const { Portal } = usePortal();
  const activeIndex = useSelector(activeIndexSelector);
  const { moveToSection } = useContext(FullPageContext);

  const isDarkMode = useSelector(modeSelector);

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
        {!isDarkMode ? isIconActive : isIconLightActive}
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
