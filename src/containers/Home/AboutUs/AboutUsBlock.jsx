import React from 'react';
import PropTypes from 'prop-types';

import { NextImage } from 'components/index';

import styles from './AboutUs.scss';

const AboutUsBlock = ({ src, className, classRope, handlerChange }) => {
  return (
    <div className={`${styles.block} ${className}`}>
      <div className={`${styles.block__rope} ${classRope}`} />
      <div role="button" onClick={handlerChange}>
        <NextImage src={src} className={styles.block__image} loading="eager" />
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
