import React from 'react';

import { paths } from 'routes/index';
import { NextLink } from 'components/index';
import {
  infoText,
  joinOurTeam,
  subtitle,
} from 'containers/Home/JoinOurTeam/constants';

import SwiperCards from './Cards';
import styles from './JoinOurTeam.scss';

const JoinOurTeam = () => {
  return (
    <section className="section">
      <div className="canvas__working" />
      <div className={`${styles.wrapper} container`}>
        <div className={styles.wrapper__info}>
          <h2 className={styles.wrapper__info_title}>{joinOurTeam}</h2>
          <h3 className={styles.wrapper__info_subtitle}>{subtitle}</h3>
          <p className={styles.wrapper__info_text}>{infoText}</p>
          <NextLink to={paths.apply} className={styles.wrapper__info_join}>
            {joinOurTeam}
          </NextLink>
        </div>
        <div className={styles.wrapper__swiper} id="app">
          <SwiperCards />
        </div>
      </div>
    </section>
  );
};

export default JoinOurTeam;
