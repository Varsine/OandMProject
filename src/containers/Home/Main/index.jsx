import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { Heading, Text } from 'components/index';
import { activeIndexSelector } from 'slices/mainSlice';

import styles from './Main.scss';

const Main = () => {
  const activeIndex = useSelector(activeIndexSelector);

  return (
    <section id="header" className="section fp-auto-height container">
      <div className={styles.video_container}>
        <video autoPlay loop muted>
          <source
            src="https://storage.googleapis.com/rbstorage/homepage/rb_8.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.wrapper__content}>
          <div className={styles.wrapper__content__left_path}>
            <Heading className={styles.wrapper__content__text}>
              What Is
              <span
                className={classNames(styles.wrapper__content__title, {
                  [styles.wrapper__content__title_anima]: activeIndex === 1,
                })}
              >
                Operations and Maintenance?
              </span>
            </Heading>
            <Text
              isSubtitle
              className={classNames(styles.wrapper__content__subtitle, {
                [styles.wrapper__content__subtitle_anima]: activeIndex === 1,
              })}
            >
              As a form of preventive maintenance, O&M can include any task
              meant to upkeep equipment before an issue arises
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
