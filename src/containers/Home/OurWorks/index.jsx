import React, { useState } from 'react';
import classNames from 'classnames';

import { NextLink } from 'components/index';
import { ourSliderData } from 'utils/index';
import { useWindowSize } from 'hooks/index';

import styles from './OurWorks.scss';

import { DownArrow } from '../../../icons/ourWork/index';

const OurWorks = () => {
  const { windowHeight, windowWidth, isMobile } = useWindowSize();
  const [curSlide, setCurSlide] = useState(0);
  const transformValue = !isMobile
    ? `translate3d(0px, -${curSlide * windowHeight}px, 0px)`
    : `translate3d(-${curSlide * windowWidth}px, 0px, 0px)`;

  const navigateDown = () => {
    if (curSlide === ourSliderData.length - 1) {
      setCurSlide(0);
    } else {
      setCurSlide(curSlide + 1);
    }
  };

  const navigateUp = () => {
    if (curSlide === 0) {
      setCurSlide(ourSliderData.length - 1);
    } else {
      setCurSlide(curSlide - 1);
    }
  };

  const renderSliderItem = ourSliderData.map(
    (
      { bg, link, title, subTitle, textInfo, className, activeClassName },
      idx,
    ) => {
      return (
        <div className={styles.block} key={link}>
          <div
            className={classNames(
              styles.text_block,
              curSlide !== idx ? className : activeClassName,
            )}
          />
          <div className={styles.info}>
            <h1 className={styles.info__title}>{title}</h1>
            <h2 className={styles.info__subtitle}>{subTitle}</h2>
            <p className={styles.info__text}>{textInfo}</p>
            <NextLink
              className={styles.info__link}
              to={link}
              anchorProps={{
                target: '_blank',
                'aria-label': title,
              }}
            >
              {link}
            </NextLink>
          </div>
          <div
            style={{ backgroundImage: `url(${bg})` }}
            className={styles.wrapper__content__item}
          />
        </div>
      );
    },
  );

  return (
    <section className={`section ${styles.work_section}`}>
      <div className="canvas__working" />
      <div className={styles.wrapper}>
        <DownArrow onClick={navigateUp} className={styles.wrapper__prev} />
        <div className={styles.wrapper__container}>
          <div
            className={styles.wrapper__content}
            style={{
              transform: transformValue,
            }}
          >
            {renderSliderItem}
          </div>
        </div>
        <DownArrow onClick={navigateDown} className={styles.wrapper__next} />
      </div>
    </section>
  );
};

export default OurWorks;
