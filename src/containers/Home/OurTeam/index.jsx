import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import { teamCards } from 'utils/index';
import {
  modeSelector,
  activeIndexSelector,
  changeTeamSliderIndex,
  teamSliderIndexSelector,
} from 'slices/mainSlice';

// import Slide from './Slide/index';
import styles from './OurTeam.scss';

import { ArrowIcon, ArrowGdtIcon } from '../../../icons';

const OurTeam = () => {
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(1000);
  const isDarkMode = useSelector(modeSelector);
  const activeSectionIndex = useSelector(activeIndexSelector);
  const activeTeamSliderIndex = useSelector(teamSliderIndexSelector);
  const isShow = activeSectionIndex === 5;

  useEffect(() => {
    setActiveIndex(isShow ? activeTeamSliderIndex : 1000);
  }, [activeSectionIndex]);

  const incrementSlideHandler = () => {
    if (activeIndex === teamCards.length - 1) {
      setActiveIndex(0);
      dispatch(changeTeamSliderIndex(0));
    } else {
      setActiveIndex(activeIndex + 1);
      dispatch(changeTeamSliderIndex(activeIndex + 1));
    }
  };

  const decrementSlideHandler = () => {
    if (activeIndex === 0) {
      setActiveIndex(teamCards.length - 1);
      dispatch(changeTeamSliderIndex(teamCards.length - 1));
    } else {
      setActiveIndex(activeIndex - 1);
      dispatch(changeTeamSliderIndex(activeIndex - 1));
    }
  };

  // const renderteamCards = teamCards.map(
  //   (item, index) =>
  //     activeIndex === index && (
  //       <Slide
  //         // eslint-disable-next-line react/no-array-index-key
  //         key={`slide ${index}`}
  //         activeIndex={activeIndex}
  //         isDarkMode={isDarkMode}
  //       />
  //     ),
  // );

  return (
    <section className="section">
      <div className="canvas__working" />
      <div className={classNames(styles.wrapper, 'container')}>
        <h2 className={styles.title}>Our Team</h2>
        {/* {renderteamCards} */}
        <div className={styles.arrows}>
          {isDarkMode ? (
            <ArrowIcon
              className={styles.arrows__left}
              onClick={decrementSlideHandler}
            />
          ) : (
            <ArrowGdtIcon
              className={styles.arrows__left}
              onClick={decrementSlideHandler}
            />
          )}
          {isDarkMode ? (
            <ArrowIcon
              className={styles.arrows__right}
              onClick={incrementSlideHandler}
            />
          ) : (
            <ArrowGdtIcon
              className={styles.arrows__right}
              onClick={incrementSlideHandler}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
