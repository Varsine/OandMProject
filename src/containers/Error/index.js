import React from 'react';

import { paths } from 'routes/index';
import { NextLink } from 'components/index';

import styles from './Error.scss';

const ErrorContainer = () => (
  <div className={styles.container}>
    <h1>404</h1>
    <NextLink to={paths.home}>Главная страница</NextLink>
  </div>
);

export default ErrorContainer;
