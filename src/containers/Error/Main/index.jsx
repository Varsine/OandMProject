import React from 'react';

import { paths } from 'routes/index';
import { NextLink } from 'components/index';

import styles from './Error.scss';

const Main = () => (
  <section className="section">
    <div className={styles.wrapper}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.subtitle}>
        OOPS! <br /> Something went wrong
      </p>
      <NextLink className={styles.link} to={paths.home}>
        Go to Home
      </NextLink>
    </div>
  </section>
);

export default Main;
