import React, { useState } from 'react';

import { industry } from 'utils/index';

import styles from './Industry.scss';

import {
  IndustyTwoIcon,
  IndustyThreeIcon,
  IndustyOneIcon,
} from '../../../icons';

const Industry = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  // const renderIndustryList = industry.map(({icon})=>)
  const handlerChangeActiveItem = (idx) => {
    setActiveIndex(idx);
  };
  return (
    <section className="section">
      <div className="canvas__working" />
      <div className={styles.wrapper}>
        <div className={styles.wrapper__menu}>
          <IndustyOneIcon />
          {/* <IndustyOneIcon onClick={() => handlerChangeActiveItem(0)} /> */}
          <IndustyTwoIcon
            className={styles.wrapper__menu__crypto}
            onClick={() => handlerChangeActiveItem(1)}
          />
          <IndustyThreeIcon onClick={() => handlerChangeActiveItem(2)} />
        </div>
        <div className={styles.wrapper__active_item}>
          anima
          <div className={styles.wrapper__active_item__info}>
            <h1 className={styles.wrapper__active_item__info__title}>
              {industry[activeIndex].title}
            </h1>
            <p>{industry[activeIndex].text}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Industry;
