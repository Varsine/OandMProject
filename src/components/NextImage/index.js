import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { noop } from 'utils/index';

import styles from './NextImage.scss';

const NextImage = ({ objectFit, src, alt, className, onClick, ...rest }) => (
  <div
    role="button"
    onClick={onClick}
    {...rest}
    className={classNames(styles.wrapper, className)}
  >
    <Image objectFit={objectFit} layout="fill" src={src} alt={alt} />
  </div>
);

NextImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  objectFit: PropTypes.string,
};

NextImage.defaultProps = {
  alt: 'image',
  onClick: noop,
  className: null,
  objectFit: '',
};

export default NextImage;
