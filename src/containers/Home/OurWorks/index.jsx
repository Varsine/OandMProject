/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useRef, useEffect } from 'react';
// import { useSelector } from 'react-redux';

// import { weLabel } from 'utils/index';
// import { NextLink } from 'components/index';
// import { modeSelector } from 'slices/mainSlice';

import './OurWorks.scss';
// import styles from './OurWorks.scss';

const OurWorks = () => {
  // const isDarkMode = useSelector(modeSelector);
  // const [activeIndex, setActiveIndex] = useState(weLabel[0].htmlFor);
  const appRef = useRef(null);
  // const [animation, setAnimation] = useState(true);
  // const [curSlide, setCurSlide] = useState(1);
  // const [scrolledUp, setScrolledUp] = useState(false);
  // const [nextSlide, setnextSlide] = useState(1);
  // const app = $('.app');
  // let animation = true;
  // let curSlide = 1;
  // let scrolledUp;
  // let nextSlide;
  // console.log(appRef.current, 'ujhikj');

  // const pagination = (slide) => {
  //   setAnimation(true);
  // if (target === undefined) {
  //   nextSlide = scrolledUp ? slide - 1 : slide + 1;
  // } else {
  //   nextSlide = target;
  // }

  // $(`.pages__item--${nextSlide}`).addClass('page__item-active');
  // $(`.pages__item--${slide}`).removeClass('page__item-active');

  //   appRef.current.toggleClass('active');
  //   setTimeout(() => {
  //     setAnimation(true);
  //   }, 3000);
  // };

  useEffect(() => {
    // const img = $('.app__img');
    // const pageNav1 = $('.pages__item--1');
    // const pageNav2 = $('.pages__item--2');
    // const pagination = (slide, target) => {
    //   animation = true;
    //   if (target === undefined) {
    //     nextSlide = scrolledUp ? slide - 1 : slide + 1;
    //   } else {
    //     nextSlide = target;
    //   }
    //   $(`.pages__item--${nextSlide}`).addClass('page__item-active');
    //   $(`.pages__item--${slide}`).removeClass('page__item-active');
    //   $app.toggleClass('active');
    //   setTimeout(() => {
    //     animation = false;
    //   }, 3000);
    // };
    // const navigateDown = () => {
    //   if (curSlide > 1) return;
    //   // scrolledUp = false;
    //   pagination(curSlide);
    //   setCurSlide(curSlide + 1);
    // };
    // const navigateUp = () => {
    //   if (curSlide === 1) return;
    //   // scrolledUp = true;
    //   pagination(curSlide);
    //   setCurSlide(curSlide - 1);
    // };
    // setTimeout(() => {
    //   $app.addClass('initial');
    // }, 1500);
    // setTimeout(() => {
    //   setAnimation(true);
    // }, 4500);
    // $(document).on('mousewheel DOMMouseScroll', (e) => {
    //   const delta = e.originalEvent.wheelDelta;
    //   if (animation) return;
    //   if (delta > 0 || e.originalEvent.detail < 0) {
    //     navigateUp();
    //   } else {
    //     navigateDown();
    //   }
    // });
    // $(document).on('click', '.pages__item:not(.page__item-active)', () => {
    //   if (animation) return;
    //   const target = +$(this).attr('data-target');
    //   pagination(curSlide, target);
    //   curSlide = target;
    // });
  }, []);

  return (
    <section className="section we_work">
      <div className="canvas__working" />
      <div className="container we_work__content">
        <div className="cont">
          <div className="mouse" />
          <div ref={appRef} className="app">
            <div className="app__bgimg">
              <div className="app__bgimg-image app__bgimg-image--1" />
              <div className="app__bgimg-image app__bgimg-image--2" />
            </div>
            <div className="app__img">
              <img
                onMouseDown="return false"
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/537051/whiteTest4.png"
                alt="city"
              />
            </div>

            <div className="app__text app__text--1">
              <div className="app__text-line app__text-line--4">imperdiet </div>
              <div className="app__text-line app__text-line--3">ut le</div>
              <div className="app__text-line app__text-line--2">
                non tincidunt{' '}
              </div>
              <div className="app__text-line app__text-line--1">
                <img
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/537051/opus-attachment.png"
                  alt=""
                />
              </div>
            </div>

            <div className="app__text app__text--2">
              <div className="app__text-line app__text-line--4">habitant</div>
              <div className="app__text-line app__text-line--3">ut eget</div>
              <div className="app__text-line app__text-line--2">
                Nam imperdiet
              </div>
              <div className="app__text-line app__text-line--1">
                <img
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/537051/opus-attachment.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="pages">
            <ul className="pages__list">
              <li
                data-target="1"
                className="pages__item pages__item--1 page__item-active"
              />
              <li data-target="2" className="pages__item pages__item--2" />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurWorks;
