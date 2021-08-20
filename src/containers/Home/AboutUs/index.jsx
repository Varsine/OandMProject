import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { aboutUsInfoList } from 'utils/index';
import { NextImage, Button } from 'components/index';
import { activeIndexSelector } from 'slices/mainSlice';

import styles from './AboutUs.scss';

const AboutUs = () => {
  const activeIndex = useSelector(activeIndexSelector);
  const isOpen = activeIndex === 2;
  const imgAnimationClassList = [
    styles.block_one,
    styles.block_two,
    styles.block_three,
    styles.block_four,
  ];
  const imges = {
    imgOne: '/images/aboutUs/2.png',
    imgTwo: '/images/aboutUs/3.png',
    imgThree: '/images/aboutUs/4.png',
    imgFour: '/images/aboutUs/5.png',
  };
  const [isAnimate] = useState(false);
  const [infoId, setInfoId] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const [imgList, setImgList] = useState(imges);
  const [activeItemImg, setActiveItemImg] = useState('/images/aboutUs/1.png');
  const [imgAnimationClasses, setImgAnimationClasses] = useState(
    imgAnimationClassList,
  );
  const { title, subTitle, paragraf } = aboutUsInfoList[infoId];
  const { imgOne, imgTwo, imgThree, imgFour } = imgList;

  useEffect(() => {
    setImgAnimationClasses(
      imgAnimationClasses.slice(1).concat(imgAnimationClasses[0]),
    );
    setTimeout(() => {
      setActiveItemImg('/images/aboutUs/1.png');
      setInfoId(0);
      setImgList(imges);
    }, 500);
  }, [isOpen]);

  const editActiveItemHandler = () => {
    setImgAnimationClasses(
      imgAnimationClasses.slice(1).concat(imgAnimationClasses[0]),
    );
  };

  const handlerImg = (currImg, idx) => {
    const imgArray = Object.keys(imgList);
    const keyImg = imgArray[idx];
    setImgList({
      ...imgList,
      [keyImg]: activeItemImg,
    });
    setActiveItemImg(currImg);
    const patt = /[1-9]/g;
    const filterNum = currImg.match(patt);
    setInfoId(filterNum);
    setIsShow(true);
    setTimeout(() => {
      setIsShow(false);
    }, 1000);
  };

  return (
    <section className="section">
      <div className={styles.wrapper}>
        <div className="canvas__working" />
        <div
          className={classNames(styles.info, { [styles.info_show]: isShow })}
        >
          <h2 className={styles.info__title}>{title}</h2>
          <h4 className={styles.info__subtitle}>{subTitle}</h4>
          <p className={styles.info__text}>{paragraf}</p>
        </div>
        <div className={styles.animation}>
          <div className={styles.photos}>
            <Button
              style={{ zIndex: 1 }}
              onClick={() => editActiveItemHandler(1)}
              disabled={isAnimate}
              className={classNames(
                styles.photos__item,
                imgAnimationClasses[0],
              )}
            >
              <NextImage
                loading="eager"
                src={imgOne}
                onClick={() => handlerImg(imgOne, 0)}
                className={styles.photos__item_image}
              />
            </Button>
            <Button
              style={{ zIndex: 2 }}
              onClick={() => editActiveItemHandler(2)}
              disabled={isAnimate}
              className={classNames(
                styles.photos__item,
                imgAnimationClasses[1],
              )}
            >
              <NextImage
                loading="eager"
                src={imgTwo}
                onClick={() => handlerImg(imgTwo, 1)}
                className={styles.photos__item_image}
              />
            </Button>
            <Button
              style={{ zIndex: 3 }}
              onClick={() => editActiveItemHandler(3)}
              disabled={isAnimate}
              className={classNames(
                styles.photos__item,
                imgAnimationClasses[2],
              )}
            >
              <NextImage
                loading="eager"
                src={imgThree}
                onClick={() => handlerImg(imgThree, 2)}
                className={styles.photos__item_image}
              />
            </Button>
            <Button
              style={{ zIndex: 4 }}
              onClick={() => editActiveItemHandler(4)}
              disabled={isAnimate}
              className={classNames(
                styles.photos__item,
                imgAnimationClasses[3],
              )}
            >
              <NextImage
                loading="eager"
                src={imgFour}
                onClick={() => handlerImg(imgFour, 3)}
                className={styles.photos__item_image}
              />
            </Button>
            <div
              style={{ zIndex: 1 }}
              className={classNames(styles.photos__item, {
                [styles.photos__item_show]: isShow,
              })}
            >
              <NextImage
                loading="eager"
                src={activeItemImg}
                className={styles.photos__item_image}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
