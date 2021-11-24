import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

import { paths } from 'routes/index';
import { NextLink } from 'components/index';
import { changeIndex } from 'slices/mainSlice';

import Cubes from './Cubes';
import styles from './JoinOurTeam.scss';
import { infoText, subtitle, joinOurTeam } from './constants';

const JoinOurTeam = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleStop = () => {
      dispatch(changeIndex(1));
    };

    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [dispatch, router]);

  const joinContainerClasses = classNames(styles.height_response, 'section');

  return (
    <section className={joinContainerClasses}>
      <div className="canvas__working" />
      <div className={`container ${styles.wrapper}`}>
        <div className={styles.wrapper__info}>
          <h2 className={styles.wrapper__info_title}>{joinOurTeam}</h2>
          <h3 className={styles.wrapper__info_subtitle}>{subtitle}</h3>
          <p className={styles.wrapper__info_text}>{infoText}</p>
          <NextLink
            role="button"
            to={paths.apply}
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
