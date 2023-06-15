import React from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import { activeIndexSelector } from "slices/mainSlice";

import styles from "./AboutUs.scss";

const AboutUs = () => {
  const activeIndex = useSelector(activeIndexSelector);

  return (
    <section className={`${styles.height_response} section`}>
      <div className={`container ${styles.wrapper}`}>
        <svg
          className={classNames(styles.wrapper__title, {
            [styles.wrapper__title_anima]: activeIndex === 2,
          })}
          viewBox='0 0 100% 100%'>
          <text x='50%' y='35%' dy='.35em' textAnchor='middle'>
            About
          </text>
          <text x='50%' y='65%' dy='.35em' textAnchor='middle'>
            Us
          </text>
        </svg>
        <div className={styles.wrapper__content}>
          <div
            className={classNames(styles.wrapper__content__first_block, {
              [styles.wrapper__content__first_block_anima]: activeIndex === 2,
            })}
          />
          <div
            className={classNames(styles.wrapper__content__second_block, {
              [styles.wrapper__content__second_block_anima]: activeIndex === 2,
            })}
          />
          <div
            className={classNames(styles.wrapper__content__text, {
              [styles.wrapper__content__text_anima]: activeIndex === 2,
            })}>
            Our company has started work since 2016 and has about 100 employees.
            At the core of every successful business lies the strong bondage
            between the company itself and its customers. The question is, how
            do you create that bondage? For online businesses, this relationship
            begins when a visitor shows interest in what your store offers and
            becomes a buyer.
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
