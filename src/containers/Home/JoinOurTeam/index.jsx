import React, { useState, useContext } from 'react';
import usePortal from 'react-useportal';

import { Button } from 'components/index';
import { IS_SERVER } from 'constants/index';
import { useWindowSize } from 'hooks/index';
import { FullPageContext } from 'context/index';

import Cubes from './Cubes';
import JoinForm from './JoinForm/index';
import { infoText, subtitle, joinOurTeam } from './constants';
//
import styles from './JoinOurTeam.scss';

const JoinOurTeam = () => {
  const { Portal } = usePortal();
  const { isDesktop } = useWindowSize();
  const [joinForm, setJoinForm] = useState(false);
  const { moveToSection } = useContext(FullPageContext);

  const joinPortal = () => {
    const innerHeight = !IS_SERVER && window.innerHeight;
    const doc = document.documentElement;

    const fullPage = document.querySelector('#fullpage');
    fullPage.classList.toggle('join-form');
    doc.style.setProperty('--app-height', `-${innerHeight * 6}px`);

    document.activeElement.blur();

    setJoinForm(!joinForm);

    if (joinForm && isDesktop) {
      moveToSection.moveTo(7);
    }
  };

  return (
    <>
      <Portal>
        <JoinForm isOpen={joinForm} backHandler={joinPortal} />
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
