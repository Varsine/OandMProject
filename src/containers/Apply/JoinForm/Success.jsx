import React from 'react';

import { NextLink } from 'components/index';
import { paths } from 'routes/index';

import styles from './Apply.scss';

import { SuccessIcon } from '../../../icons';

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
