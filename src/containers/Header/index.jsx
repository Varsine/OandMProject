import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import usePortal from 'react-useportal';
import { useSelector } from 'react-redux';

import { FullPageContext } from 'context/index';
import { activeIndexSelector } from 'slices/mainSlice';

import styles from './Header.scss';

import {
  LogoIcon,
  ActiveTeamIcon,
  ActiveHomeIcon,
  ActiveWeWorkIcon,
  ActiveIndustryIcon,
  ActivePortfolioIcon,
  ActiveTeamMembersIcon,
  ActiveInformationIcon,
} from '../../icons';

const Header = () => {
  const { Portal } = usePortal();
  const { moveToSection } = useContext(FullPageContext);
  const activeIndex = useSelector(activeIndexSelector);

  const memoizedUpdateActiveIcon = useCallback(() => {
    switch (activeIndex) {
      case 2: {
        return <ActiveInformationIcon />;
      }
      case 3: {
        return <ActiveWeWorkIcon />;
      }
      case 4: {
        return <ActiveIndustryIcon />;
      }
      case 5: {
        return <ActivePortfolioIcon />;
      }
      case 6: {
        return <ActiveTeamIcon />;
      }
      case 7: {
        return <ActiveTeamMembersIcon />;
      }
      default:
        return <ActiveHomeIcon />;
    }
  }, [activeIndex]);

  const moveToSectionTop = () => {
    moveToSection.moveTo(1);
  };
  return (
    <Portal>
      <header className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <LogoIcon aria-label="logo" onClick={moveToSectionTop} />
          </div>

          <div className={styles.icon}>{memoizedUpdateActiveIcon()}</div>
        </div>
      </header>
    </Portal>
  );
};

Header.propTypes = {
  isOnePage: PropTypes.bool.isRequired,
};

export default Header;
