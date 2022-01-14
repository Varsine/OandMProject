import React, { useMemo, useState, useEffect } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { industry } from 'utils/index';
import { useWindowSize } from 'hooks/index';
import { activeIndexSelector } from 'slices/mainSlice';

import styles from './Industry.scss';

const Industry = () => {
  const { isDesktop } = useWindowSize();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSelector = useSelector(activeIndexSelector);

  const { text, title, src } = useMemo(
    () => industry[activeIndex],
    [activeIndex],
  );

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    import('@lottiefiles/lottie-player');
  });

  const isShow = activeSelector === 4;

  const gifClass = classNames(styles.wrapper__active_item__gif, {
    [styles.wrapper__active_item__gif_first]: activeIndex === 0,
    [styles.wrapper__active_item__gif_animation]: isShow,
  });

  const infoClass = classNames(styles.wrapper__active_item__info, {
    [styles.wrapper__active_item__info_anima]: isShow,
  });

  const lottieAnimation = useMemo(
    () => `<lottie-player src=${src} loop="true" autoplay="true" />`,
    [src],
  );

  const renderIndustries = industry.map((industryItem, index) => {
    const stylesKey = `wrapper__menu${industryItem.class}`;
    const classes = classNames(styles.wrapper__menu__item, {
      [styles[stylesKey]]: isShow,
      [styles.wrapper__menu__active]: activeIndex === index,
    });

    return (
      <div
        role="button"
        className={classes}
        key={industryItem.id}
        onClick={() => setActiveIndex(index)}
      >
        <industryItem.icon />
        <p className={styles.wrapper__menu__text}>{industryItem.title}</p>
      </div>
    );
  });

  const industryStyles = classNames(styles.wrapper, {
    [styles.d_none]: activeSelector !== 4 && isDesktop,
  });

  return (
    <section className={`${styles.height_response} section`}>
      <div className="canvas__working" />
      <div className={`container ${industryStyles}`}>
        <div className={styles.wrapper__menu}>{renderIndustries}</div>
        <div className={styles.wrapper__active_item}>
          <div
            className={gifClass}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: lottieAnimation,
            }}
          />
          <div className={infoClass}>
            <h1 className={styles.wrapper__active_item__info__title}>
              {title}
            </h1>
            <p className={styles.wrapper__active_item__info_anima__text}>
              {text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Industry;
