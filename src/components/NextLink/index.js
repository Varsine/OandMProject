import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useRouter } from 'next/router';

import { noop } from 'utils/index';

const NextLink = ({
  to,
  target,
  onClick,
  children,
  disabled,
  queryKey,
  className,
  queryValue,
  anchorProps,
  activeClassName,
  ...linkProps
}) => {
  const { asPath, query } = useRouter();
  const anchorClasses = classNames(className, {
    [activeClassName]: query[queryKey]
      ? query[queryKey] === queryValue
      : asPath === to && activeClassName,
  });

  return (
    <Link href={to} {...linkProps}>
      <a
        role="button"
        target={target}
        className={anchorClasses}
        {...anchorProps}
        onClick={onClick}
      >
        {children}
      </a>
    </Link>
  );
};

NextLink.propTypes = {
  children: PropTypes.any,
  target: PropTypes.string,
  disabled: PropTypes.string,
  queryKey: PropTypes.string,
  className: PropTypes.any,
  queryValue: PropTypes.any,
  anchorProps: PropTypes.any,
  activeClassName: PropTypes.string,
  onClick: PropTypes.func,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

NextLink.defaultProps = {
  target: '',
  children: [],
  disabled: undefined,
  queryKey: undefined,
  className: undefined,
  queryValue: undefined,
  anchorProps: {},
  onClick: noop(),
  activeClassName: undefined,
};

export default NextLink;
