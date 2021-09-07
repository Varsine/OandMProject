import React from 'react';
import classNames from 'classnames';

import { paths } from 'routes/index';
import { NextLink } from 'components/index';

import styles from './JoinOurTeam.scss';

const JoinOurTeam = () => (
  <section className="section">
    <div className="canvas__working" />
    <div className={classNames(styles.wrapper, 'container')}>
      <div className={styles.wrapper__info}>
        <h2 className={styles.wrapper__info_title}>Team</h2>
        <h3 className={styles.wrapper__info_subtitle}>
          ShellLogix team perform an activity since 2017 and have his own
          interesting story.
        </h3>
        <p className={styles.wrapper__info_text}>
          ShellLogix was established whit members who prefer solving unsolvable
          problems and give them creative solutions. They are even ready to work
          with you and ready to do everything for you to achieve your goals. The
          most important thing in our team is not to be just a professional
          specialist, our professionals are responsible and hardworking, they
          even ready to work day and night for you if there is a need.
        </p>
        <NextLink to={paths.apply} className={styles.wrapper__info_join}>
          Join our team
        </NextLink>
      </div>
      <div className={styles.wrapper__photos} />
    </div>
  </section>
);

export default JoinOurTeam;
