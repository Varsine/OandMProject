import React, { useMemo, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { modeSelector, activeIndexSelector } from 'slices/mainSlice';

import styles from './OurTeam.scss';

import './style.css';

const GlitchSquiggly = dynamic(
  () => import('react-glitch-effect/core/GlitchSquiggly'),
  {
    ssr: false,
  },
);

const Slide = ({ slide }) => {
  const activeIndex = useSelector(activeIndexSelector);

  const isDarkMode = useSelector(modeSelector);
  const [isGlitchscaleNoise, setIsGlitchscaleNoise] = useState('25');

  useEffect(() => {
    if (activeIndex === 6) {
      const firstTimeoutId = setTimeout(() => {
        setIsGlitchscaleNoise('10');
      }, 800);
      const secondTimeoutId = setTimeout(() => {
        setIsGlitchscaleNoise('8');
      }, 1500);
      const thirdTimeoutId = setTimeout(() => {
        setIsGlitchscaleNoise('6');
      }, 2000);
      const fourthTimeoutId = setTimeout(() => {
        setIsGlitchscaleNoise('4');
      }, 2300);
      const fifthTimeoutId = setTimeout(() => {
        setIsGlitchscaleNoise('1.3');
      }, 3000);

      return () => {
        clearTimeout(firstTimeoutId);
        clearTimeout(secondTimeoutId);
        clearTimeout(thirdTimeoutId);
        clearTimeout(fourthTimeoutId);
        clearTimeout(fifthTimeoutId);
      };
    }
  }, [activeIndex]);

  const {
    image1,
    image2,
    image3,
    image4,
    imageLight1,
    imageLight2,
    imageLight3,
    imageLight4,
    title,
    subtitle,
  } = slide;

  const darkModeImageClasses = useMemo(
    () =>
      classNames(styles.carousel__item_imges_img, 'glitch', {
        [styles.carousel__item_imges_img_active]: isDarkMode,
      }),
    [isDarkMode],
  );

  const lightImageClasses = useMemo(
    () =>
      classNames(styles.carousel__item_imges_img, 'glitch', {
        [styles.carousel__item_imges_img_active]: !isDarkMode,
      }),
    [isDarkMode],
  );

  const baseTimme = 0.07;

  return (
    <GlitchSquiggly
      disabled={false}
      className={styles.jbl}
      baseFrequency={baseTimme}
      iterationCount="infinite"
      scaleNoise={isGlitchscaleNoise}
    >
      <div className={styles.carousel__item}>
        <div className={styles.carousel__item_imges}>
          <div className={darkModeImageClasses}>
            <div
              style={{ background: `url(${imageLight1})` }}
              className="glitch-img"
            />
            <div
              style={{ background: `url(${imageLight2})` }}
              className="glitch-img"
            />
            <div
              className="glitch-img"
              style={{ background: `url(${imageLight3})` }}
            />
            <div
              className="glitch-img"
              style={{ background: `url(${imageLight4})` }}
            />
          </div>
          <div className={lightImageClasses}>
            <div
              className="glitch-img"
              style={{ background: `url(${image1})` }}
            />
            <div
              className="glitch-img"
              style={{ background: `url(${image2})` }}
            />
            <div
              style={{ background: `url(${image3})` }}
              className="glitch-img"
            />
            <div
              style={{ background: `url(${image4})` }}
              className="glitch-img"
            />
          </div>
        </div>
        <div className={styles.carousel__item__text_block}>
          <h2 className={styles.carousel__item__text_block_title}>{title}</h2>
          <h3 className={styles.carousel__item__text_block_subtitle}>
            {subtitle}
          </h3>
        </div>
      </div>
    </GlitchSquiggly>
  );
};

Slide.propTypes = {
  slide: PropTypes.object.isRequired,
  isActive: PropTypes.bool,
};

Slide.defaultProps = {
  isActive: false,
};

export default Slide;
