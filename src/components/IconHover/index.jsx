import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { noop } from 'utils/index';

import styles from './IconHover.scss';

import NextLink from '../NextLink';

const IconHover = ({
  id,
  url,
  icon,
  isLink,
  onClick,
  className,
  iconHover,
  anchorProps,
}) => (
  <div
    id={id}
    role="button"
    className={classNames(styles.wrapper, className)}
    onClick={onClick}
  >
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
        <div {...anchorProps} className={styles.wrapper__item}>
          {icon}
        </div>
        <div {...anchorProps} className={styles.wrapper__item}>
          {iconHover}
        </div>
      </>
    )}
  </div>
);

IconHover.propTypes = {
  id: PropTypes.string,
  url: PropTypes.string,
  icon: PropTypes.node.isRequired,
  isLink: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  iconHover: PropTypes.node.isRequired,
  anchorProps: PropTypes.object,
};

IconHover.defaultProps = {
  id: '',
  url: '',
  isLink: true,
  onClick: noop,
  className: '',
  anchorProps: {},
};

export default IconHover;
