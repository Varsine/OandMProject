import React from 'react';
import PropTypes from 'prop-types';
import { QuestionOctagon } from '@styled-icons/bootstrap/QuestionOctagon';

import { NextImage } from 'components/index';

import styles from './AboutUs.scss';

const AboutUsBlock = ({ src, className, classRope, handlerChange }) => {
  return (
    <div className={`${styles.block} ${className}`}>
      <div className={`${styles.block__rope} ${classRope}`} />
      <div className={styles.block__img} role="button" onClick={handlerChange}>
        <div className={styles.block__img_wrapper}>
          <QuestionOctagon className={styles.block__img_wrapper_icon} />
        </div>
        <NextImage
          src={src}
          className={styles.block__img__image}
          loading="eager"
        />
      </div>
    </div>
  );
};

AboutUsBlock.propTypes = {
  src: PropTypes.string,
  classRope: PropTypes.string,
  className: PropTypes.string,
  handlerChange: PropTypes.func,
};

AboutUsBlock.defaultProps = {
  src: '',
  classRope: '',
  className: '',
  handlerChange: () => {},
};

export default AboutUsBlock;
