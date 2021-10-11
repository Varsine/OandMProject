import React from 'react';
import PropTypes from 'prop-types';

import { NextImage, NextLink } from 'components/index';

import styles from './OurWorks.scss';

const Slide = ({ data }) => {
  const { src, title, subtitle, text, href, link } = data;

  return (
    <div className={styles.slider__item}>
      <NextImage
        src={src}
        alt={title}
        objectFit="contain"
        className={styles.slider__item_image}
      />
      <div className={styles.slider__item_info}>
        <div className={styles.slider__item_wrapper}>
          <h2 className={styles.slider__item_title}>{title}</h2>
          <h4 className={styles.slider__item_subtitle}>{subtitle}</h4>
          <p className={styles.slider__item_text}>{text}</p>
          <NextLink
            to={href}
            className={styles.slider__item_link}
            anchorProps={{ target: '__blanck' }}
          >
            {link}
          </NextLink>
        </div>
      </div>
    </div>
  );
};

Slide.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default Slide;
