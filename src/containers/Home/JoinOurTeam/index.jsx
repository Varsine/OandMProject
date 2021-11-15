import React from 'react';

import { paths } from 'routes/index';
import { NextLink } from 'components/index';

import SwiperCards from './Cards';
import styles from './JoinOurTeam.scss';
import { infoText, subtitle, joinOurTeam } from './constants';

const JoinOurTeam = () => (
  <section className={`${styles.height_response} section`}>
    <div className="canvas__working" />
    <div className={`container ${styles.wrapper}`}>
      <div className={styles.wrapper__info}>
        <h2 className={styles.wrapper__info_title}>{joinOurTeam}</h2>
        <h3 className={styles.wrapper__info_subtitle}>{subtitle}</h3>
        <p className={styles.wrapper__info_text}>{infoText}</p>
        <NextLink to={paths.apply} className={styles.wrapper__info_join}>
          {joinOurTeam}
        </NextLink>
      </div>
      <SwiperCards />
    </div>
  </section>
);

export default JoinOurTeam;
