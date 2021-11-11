import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import usePortal from 'react-useportal';
import { useSelector } from 'react-redux';

import { paths } from 'routes/index';
import { Clock, NextLink } from 'components/index';
import { FullPageContext } from 'context/index';
import { activeIndexSelector } from 'slices/mainSlice';

import styles from './Header.scss';

import {
  LogoIcon,
  Section10ActiveIcon,
  Section11ActiveIcon,
  Section4ActiveIcon,
  Section5ActiveIcon,
  Section6ActiveIcon,
  Section7ActiveIcon,
  Section8ActiveIcon,
  Section9ActiveIcon,
  SectionOneActiveIcon,
  SectionThreeActiveIcon,
  SectionTwoActiveIcon,
} from '../../icons';

const Header = ({ isOnePage }) => {
  const { Portal } = usePortal();
  const { moveToSection } = useContext(FullPageContext);
  const activeIndex = useSelector(activeIndexSelector);

  const memoizedUpdateActiveIcon = useCallback(() => {
    switch (activeIndex) {
      case 2: {
        return <SectionTwoActiveIcon />;
      }
      case 3: {
        return <SectionThreeActiveIcon />;
      }
      case 4: {
        return <Section4ActiveIcon />;
      }
      case 5: {
        return <Section5ActiveIcon />;
      }
      case 6: {
        return <Section6ActiveIcon />;
      }
      case 7: {
        return <Section7ActiveIcon />;
      }
      case 8: {
        return <Section8ActiveIcon />;
      }
      case 9: {
        return <Section9ActiveIcon />;
      }
      case 10: {
        return <Section10ActiveIcon />;
      }
      case 11: {
        return <Section11ActiveIcon />;
      }
      default:
        return <SectionOneActiveIcon />;
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
            {isOnePage ? (
              <NextLink to={paths.home}>
                <LogoIcon />
              </NextLink>
            ) : (
              <LogoIcon aria-label="logo" onClick={moveToSectionTop} />
            )}
          </div>
          <Clock />

          {!isOnePage ? (
            <div className={styles.icon}>{memoizedUpdateActiveIcon()}</div>
          ) : null}
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
