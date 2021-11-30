import React, { useState } from 'react';
import usePortal from 'react-useportal';

import { Button } from 'components/index';

import Cubes from './Cubes';
import JoinForm from './JoinForm/index';
import { infoText, subtitle, joinOurTeam } from './constants';
//
import styles from './JoinOurTeam.scss';

const JoinOurTeam = () => {
  const { Portal } = usePortal();
  const [joinForm, setJoinForm] = useState(false);

  const joinPortal = () => {
    setJoinForm(!joinForm);
  };

  return (
    <>
      <Portal>
        <JoinForm
          isOpen={joinForm}
          joinForm={joinForm}
          backHandler={joinPortal}
        />
      </Portal>
      <section className={`${styles.height_response} section`}>
        <div className="canvas__working" />

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
    </>
  );
};

export default JoinOurTeam;
