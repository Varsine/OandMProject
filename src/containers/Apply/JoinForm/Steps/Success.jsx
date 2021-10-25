import React from 'react';

import { paths } from 'routes/index';
import { NextLink } from 'components/index';

import { SuccessIcon } from '../../../../icons';
//
import styles from '../Apply.scss';

const Success = () => (
  <div className={styles.success}>
    <SuccessIcon />
    <h1 className={styles.success__title}>
      Your applicatioin successfully submited!
    </h1>
    <NextLink to={paths.home} className={styles.success__link}>
      Home
    </NextLink>
  </div>
);

export default Success;
