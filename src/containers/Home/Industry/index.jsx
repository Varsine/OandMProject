/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
// import * as LottiePlayer from '@lottiefiles/lottie-player';

import { industry } from 'utils/index';
import { activeIndexSelector } from 'slices/mainSlice';

import styles from './Industry.scss';

import {
  IndustyTwoIcon,
  IndustyThreeIcon,
  IndustyFirstIcon,
} from '../../../icons';

const Industry = () => {
  React.useEffect(() => {
    import('@lottiefiles/lottie-player');
  });

  const activeSelector = useSelector(activeIndexSelector);
  const isShow = activeSelector === 4;
  const [activeIndex, setActiveIndex] = useState(0);
  const { text, title, src } = industry[activeIndex];

  const ecommerceClass = classNames(styles.wrapper__menu__item, {
    [styles.wrapper__menu__oneIcon]: isShow,
    [styles.wrapper__menu__active]: activeIndex === 0,
  });

  const cryptoClass = classNames(styles.wrapper__menu__crypto, {
    [styles.wrapper__menu__twoIcon]: isShow,
    [styles.wrapper__menu__active]: activeIndex === 1,
  });

  const bussinessClass = classNames(styles.wrapper__menu__item, {
    [styles.wrapper__menu__threeIcon]: isShow,
    [styles.wrapper__menu__active]: activeIndex === 2,
  });

  const gifClass = classNames(styles.wrapper__active_item__gif, {
    [styles.wrapper__active_item__gif_first]: activeIndex === 0,
    [styles.wrapper__active_item__gif_animation]: isShow,
  });

  const infoClass = classNames(styles.wrapper__active_item__info, {
    [styles.wrapper__active_item__info_anima]: isShow,
  });

  // packagi het ka xndir src editi jamanak live update chi linum;

  const ecommerceGif = activeIndex === 0 && (
    <lottie-player src={src} loop autoplay />
  );
  const cryptoAnima = activeIndex === 1 && (
    <lottie-player src={src} loop autoplay />
  );
  const bussinessAnima = activeIndex === 2 && (
    <lottie-player src={src} loop autoplay />
  );

  const handlerChangeActiveItem = (idx) => {
    setActiveIndex(idx);
  };

  useEffect(() => {
    setTimeout(() => {
      setActiveIndex(0);
    }, 500);
  }, [isShow]);

  return (
    <section className="section">
      <div className={styles.wrapper}>
        <div className="canvas__working" />
        <div className={styles.wrapper__menu}>
          <div
            role="button"
            className={ecommerceClass}
            onClick={() => handlerChangeActiveItem(0)}
          >
            <IndustyFirstIcon />
            <p className={styles.wrapper__menu__text}>Ecommerce</p>
          </div>
          <div
            role="button"
            className={cryptoClass}
            onClick={() => handlerChangeActiveItem(1)}
          >
            <IndustyTwoIcon />
            <p className={styles.wrapper__menu__text}>Crypto</p>
          </div>
          <div
            role="button"
            className={bussinessClass}
            onClick={() => handlerChangeActiveItem(2)}
          >
            <IndustyThreeIcon />
            <p className={styles.wrapper__menu__text}>Bussiness</p>
          </div>
        </div>
        <div className={styles.wrapper__active_item}>
          <div className={gifClass}>
            {ecommerceGif}
            {cryptoAnima}
            {bussinessAnima}
          </div>
          <div className={infoClass}>
            <h1 className={styles.wrapper__active_item__info__title}>
              {title}
            </h1>
            <p>{text}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Industry;
