import React, { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';

import { NextLink } from 'components/index';
import { ourSliderData } from 'utils/index';
import { useWindowSize } from 'hooks/index';

import styles from './OurWorks.scss';

import { DownArrow } from '../../../icons/ourWork';

const OurWorks = () => {
  const { windowHeight, windowWidth, isMobile } = useWindowSize();
  const [curSlide, setCurSlide] = useState(0);

  const transformValue = useMemo(
    () =>
      !isMobile
        ? `translate3d(0px, -${curSlide * windowHeight}px, 0px)`
        : `translate3d(-${curSlide * windowWidth}px, 0px, 0px)`,
    [isMobile, curSlide, windowHeight],
  );

  const navigateDown = useCallback(() => {
    if (curSlide === ourSliderData.length - 1) {
      setCurSlide(0);
    } else {
      setCurSlide(curSlide + 1);
    }
  }, [curSlide]);

  const navigateUp = useCallback(() => {
    if (curSlide === 0) {
      setCurSlide(ourSliderData.length - 1);
    } else {
      setCurSlide(curSlide - 1);
    }
  }, [curSlide]);

  const renderSliderItem = ourSliderData.map(
    (
      {
        bg,
        link,
        title,
        subTitle,
        textInfo,
        className,
        projectPage,
        activeClassName,
      },
      idx,
    ) => (
      <div className={styles.block} key={title}>
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
          {link ? (
            <NextLink
              className={styles.info__link}
              to={link}
              anchorProps={{
                target: '_blank',
                rel: 'noreferrer',
                'aria-label': title,
              }}
            >
              {projectPage}
            </NextLink>
          ) : (
            <span className={styles.info__link}>{projectPage}</span>
          )}
        </div>

        <div
          style={{ backgroundImage: `url(${bg})` }}
          className={styles.wrapper__content__item}
        />
      </div>
    ),
  );

  return (
    <section className={`${styles.height_response} section`}>
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
