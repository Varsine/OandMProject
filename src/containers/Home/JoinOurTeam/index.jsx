import React from 'react';
import { useDispatch } from 'react-redux';

import { paths } from 'routes/index';
import { NextLink } from 'components/index';
import { changeIndex } from 'slices/mainSlice';

import Cubes from './Cubes';
import styles from './JoinOurTeam.scss';
import { infoText, subtitle, joinOurTeam } from './constants';

const JoinOurTeam = () => {
  const dispatch = useDispatch();

  const setInitialIndex = () => {
    dispatch(changeIndex(1));
  };

  return (
    <section className={`${styles.height_response} section`}>
      <div className="canvas__working" />
      <div className={`container ${styles.wrapper}`}>
        <div className={styles.wrapper__info}>
          <h2 className={styles.wrapper__info_title}>{joinOurTeam}</h2>
          <h3 className={styles.wrapper__info_subtitle}>{subtitle}</h3>
          <p className={styles.wrapper__info_text}>{infoText}</p>
          <NextLink
            role="button"
            to={paths.apply}
            onClick={setInitialIndex}
            className={styles.wrapper__info_join}
          >
            {joinOurTeam}
          </NextLink>
        </div>
        <Cubes />
      </div>
    </section>
  );
};

export default JoinOurTeam;
