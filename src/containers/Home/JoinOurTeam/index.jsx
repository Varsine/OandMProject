// import React, { useEffect, useState } from 'react';
import React, { useState } from 'react';
// import { useRouter } from 'next/router';
// import { useDispatch } from 'react-redux';
import classNames from 'classnames';

import { Button } from 'components/index';
// import { changeIndex } from 'slices/mainSlice';

import Cubes from './Cubes';
import JoinForm from './JoinForm/index';
import { infoText, subtitle, joinOurTeam } from './constants';
//
import styles from './JoinOurTeam.scss';

const JoinOurTeam = () => {
  const [joinForm, setJoinForm] = useState(false);

  // const router = useRouter();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const handleStop = () => {
  //     dispatch(changeIndex(1));
  //   };

  //   router.events.on('routeChangeComplete', handleStop);
  //   router.events.on('routeChangeError', handleStop);

  //   return () => {
  //     router.events.off('routeChangeComplete', handleStop);
  //     router.events.off('routeChangeError', handleStop);
  //   };
  // }, [dispatch, router]);

  const joinPortal = () => {
    setJoinForm(!joinForm);
  };

  const joinPortalClasses = classNames(styles.joinform_portal, {
    [styles.joinform_portal__anima]: joinForm,
  });

  return (
    <section className={`${styles.height_response} section`}>
      <div className="canvas__working" />
      <div className={joinPortalClasses}>
        <JoinForm />
      </div>
      <div className={`container ${styles.wrapper}`}>
        <div className={styles.wrapper__info}>
          <h2 className={styles.wrapper__info_title}>{joinOurTeam}</h2>
          <h3 className={styles.wrapper__info_subtitle}>{subtitle}</h3>
          <p className={styles.wrapper__info_text}>{infoText}</p>
          <Button onClick={joinPortal} className={styles.wrapper__info_join}>
            {joinOurTeam}
          </Button>
        </div>
        <Cubes />
      </div>
    </section>
  );
};

export default JoinOurTeam;
