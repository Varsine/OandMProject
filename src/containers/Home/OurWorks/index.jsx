import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { weLabel } from 'utils/index';
import { NextLink } from 'components/index';
import { modeSelector } from 'slices/mainSlice';

import styles from './OurWorks.scss';

const OurWorks = () => {
  const isDarkMode = useSelector(modeSelector);
  const [activeIndex, setActiveIndex] = useState(weLabel[0].htmlFor);

  const isCheckedHandler = (el) => {
    setActiveIndex(el);
  };

  const renderInputs = useMemo(
    () =>
      weLabel.map((elem, index) => (
        <input
          type="radio"
          name="slider"
          id={elem.htmlFor}
          key={elem.htmlFor}
          value={elem.htmlFor}
          className="carousel__inp"
          defaultChecked={index === 0}
          onChange={(event) => isCheckedHandler(event.target.value)}
        />
      )),
    [],
  );

  const renderLabels = useMemo(
    () =>
      weLabel.map((item) => (
        <label
          id={item.id}
          key={item.id}
          type="button"
          htmlFor={item.htmlFor}
          className="slider__item"
          style={{
            backgroundImage: isDarkMode ? item.darkImage : item.image,
          }}
        >
          <NextLink
            target="_blanck"
            to={item.hrefLink}
            className={isDarkMode ? styles.next_dark_link : styles.next_link}
          >
            {activeIndex === item.htmlFor && item.text}
          </NextLink>
        </label>
      )),
    [isDarkMode, activeIndex],
  );

  const renderTexts = useMemo(() => {
    const activeItem = weLabel.find((weItem) => weItem.htmlFor === activeIndex);

    return <p className="we_work__text">{activeItem.title}</p>;
  }, [activeIndex]);

  const renderSubTitle = useMemo(() => {
    const activeItem = weLabel.find((weItem) => weItem.htmlFor === activeIndex);

    return <p className="we_work__subtitle">{activeItem.subtitle}</p>;
  }, [activeIndex]);

  return (
    <section className="section we_work">
      <div className="canvas__working" />
      <div className="container we_work__content">
        <h2 className="we_work__title">Our works</h2>
        {renderSubTitle}
        <div className="we_work__slider">
          <div className="slider_we_work" id="slider_we_work">
            {renderInputs}
            {renderLabels}
          </div>
        </div>
        {renderTexts}
      </div>
    </section>
  );
};

export default OurWorks;
