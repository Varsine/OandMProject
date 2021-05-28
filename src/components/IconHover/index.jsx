import React from 'react';
import PropTypes from 'prop-types';

import styles from './IconHover.scss';

import NextLink from '../NextLink';

const IconHover = ({ icon, iconHover, isLink, url, anchorProps }) => (
  <div className={styles.wrapper}>
    {isLink ? (
      <>
        <NextLink
          to={url}
          className={styles.wrapper__item}
          anchorProps={anchorProps}
        >
          {icon}
        </NextLink>
        <NextLink
          to={url}
          className={styles.wrapper__item}
          anchorProps={anchorProps}
        >
          {iconHover}
        </NextLink>
      </>
    ) : (
      <>
        <div className={styles.wrapper__item}>{icon}</div>
        <div className={styles.wrapper__item}>{iconHover}</div>
      </>
    )}
  </div>
);

IconHover.propTypes = {
  url: PropTypes.string,
  icon: PropTypes.node.isRequired,
  isLink: PropTypes.bool,
  iconHover: PropTypes.node.isRequired,
  anchorProps: PropTypes.object,
};

IconHover.defaultProps = {
  url: '',
  isLink: true,
  anchorProps: {},
};

export default IconHover;
