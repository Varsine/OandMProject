import React, { useMemo, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { activeIndexSelector } from 'slices/mainSlice';

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

  const [isGlitchScaleNoise, setIsGlitchScaleNoise] = useState(25);

  useEffect(() => {
    if (activeIndex === 6) {
      const firstTimeoutId = setTimeout(() => {
        setIsGlitchScaleNoise(10);
      }, 800);
      const secondTimeoutId = setTimeout(() => {
        setIsGlitchScaleNoise(8);
      }, 1500);
      const thirdTimeoutId = setTimeout(() => {
        setIsGlitchScaleNoise(6);
      }, 2000);
      const fourthTimeoutId = setTimeout(() => {
        setIsGlitchScaleNoise(4);
      }, 2300);
      const fifthTimeoutId = setTimeout(() => {
        setIsGlitchScaleNoise(0.3);
      }, 3000);

      return () => {
        clearTimeout(firstTimeoutId);
        clearTimeout(secondTimeoutId);
        clearTimeout(thirdTimeoutId);
        clearTimeout(fourthTimeoutId);
        clearTimeout(fifthTimeoutId);
      };
    }
    return setIsGlitchScaleNoise(25);
  }, [activeIndex]);

  const { image1, image2, image3, image4, title, subtitle } = slide;

  const imageClasses = useMemo(() =>
    classNames(styles.carousel__item_images_img, 'glitch'),
  );

  const baseTime = 0.07;

  return (
    <GlitchSquiggly
      disabled={false}
      className={styles.glitch_effect}
      baseFrequency={baseTime}
      iterationCount="infinite"
      scaleNoise={isGlitchScaleNoise}
    >
      <div className={styles.carousel__item}>
        <div className={styles.carousel__item_images}>
          <div className={imageClasses}>
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
