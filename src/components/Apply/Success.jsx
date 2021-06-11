import React from 'react';

import { paths } from 'routes/';

import styles from './Apply.scss';

import NextLink from '../NextLink';
import { SuccessIcon } from '../../icons';

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
