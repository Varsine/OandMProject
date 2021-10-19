// import React from 'react';
// import Slider from 'react-slick';
// import classNames from 'classnames';

// import { worksCards } from 'utils/index';

// import Slide from './Slide';
// import Arrows from './Arrows';
// import styles from './OurWorks.scss';

// const OurWorks = () => {
//   const settings = {
//     speed: 500,
//     dots: false,
//     fade: false,
//     infinite: true,
//     autoplay: true,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplaySpeed: 6000,
//     adaptiveHeight: false,
//     nextArrow: <Arrows type="next" />,
//     prevArrow: <Arrows type="prev" />,
//     className: `slick__container ${styles.slider}`,
//   };

//   const renderSlides = worksCards.map((item) => (
//     <Slide key={item.id} data={item} />
//   ));

//   return (
//     <section
//       className={classNames(
//         'section',
//         styles.works_section,
//         styles.height_reponce,
//       )}
//     >
//       <div className="canvas__working" />
//       <div className={`${styles.wrapper} container`}>
//         <Slider {...settings}>{renderSlides}</Slider>
//       </div>
//     </section>
//   );
// };

// export default OurWorks;
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { NextLink } from 'components/index';
import { weLabel } from 'utils/index';
import { modeSelector } from 'slices/mainSlice';

import styles from './OurWorks.scss';

const AboutUsContainer = () => {
  const isDarkMode = useSelector(modeSelector);
  // const labels = useMemo(() => weLabel(isDarkMode), [isDarkMode]);
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
          key={item.id}
          type="button"
          className="slider__item"
          htmlFor={item.htmlFor}
          id={item.id}
          style={{
            backgroundImage: isDarkMode ? item.darkImage : item.image,
          }}
        >
          <NextLink
            className={isDarkMode ? styles.next_dark_link : styles.next_link}
            to={item.hrefLink}
            target="_blanck"
          >
            {item.text}
          </NextLink>
        </label>
      )),
    [isDarkMode],
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
        <h2 className="we_work__title">We work</h2>
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

export default AboutUsContainer;
