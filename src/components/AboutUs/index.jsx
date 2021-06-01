import React from 'react';
import classNames from 'classnames';

import { NextImage } from 'components/index';
import { aboutUsList } from 'utils/index';

import styles from './AboutUs.scss';

const AboutUs = () => {
  const renderAboutPhotos = aboutUsList.map(({ id, url }, index) => (
    <div
      className={classNames(styles.photos__item, {
        [styles.photos__item_active]: index === 0,
      })}
      key={id}
    >
      <NextImage src={url} className={styles.photos__item_image} />
    </div>
  ));

  return (
    <section className="section">
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <h2 className={styles.info__title}>About Us</h2>
          <h4 className={styles.info__subtitle}>
            SHELLLOGIX LLC has been established in 2017 with a mission to offer
            creative solutions in the field of.
          </h4>
          <p className={styles.info__text}>
            We believe that contemporary ideas and technologies are the key
            milestones for creating strategic solutions for traditions based on
            businesses.
          </p>
        </div>
        <div className={styles.photos}>{renderAboutPhotos}</div>
      </div>
    </section>
  );
};

export default AboutUs;
