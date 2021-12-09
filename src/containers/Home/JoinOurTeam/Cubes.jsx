import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { activeIndexSelector } from 'slices/mainSlice';

import { dotsData, boxFaceData } from './constants';
import styles from './JoinOurTeam.scss';

const Cubes = () => {
  const activeIndex = useSelector(activeIndexSelector);
  const cubeScaleRef = useRef(null);
  const cubeRotateRef = useRef(null);
  const isActiveSection = activeIndex === 7;

  const [rotateX, setRotateX] = useState('0deg');
  const [rotateY, setRotateY] = useState('0deg');
  const [activeDot, setActiveDot] = useState(1);
  const [isActiveFace, setIsActiveFace] = useState(false);

  const nextCubFace = () => {
    if (activeDot === 6) {
      setActiveDot(1);
    } else {
      setActiveDot(activeDot + 1);
    }
    setIsActiveFace(true);
    cubeScaleRef.current = setTimeout(() => {
      setIsActiveFace(false);
    }, 500);
  };

  const changeActiveDots = (id, x, y) => {
    setActiveDot(id);
    setRotateX(x);
    setRotateY(y);
    clearTimeout(cubeRotateRef.current);
    setIsActiveFace(true);
    cubeScaleRef.current = setTimeout(() => {
      setIsActiveFace(false);
    }, 500);
  };

  useEffect(() => {
    if (isActiveSection) {
      const { rotY, rotX } = dotsData[activeDot - 1];
      setRotateX(rotX);
      setRotateY(rotY);
      cubeRotateRef.current = setTimeout(nextCubFace, 2000);
    } else {
      clearTimeout(cubeScaleRef.current);
    }
  }, [isActiveSection, activeDot]);

  const mouseEnterCube = () => clearTimeout(cubeRotateRef.current);

  const mouseLeaveCube = () => {
    cubeRotateRef.current = setTimeout(nextCubFace, 2000);
  };

  const renderDots = dotsData.map(({ id, rotY, rotX, classSecond }) => {
    const dotsClasses = classNames(styles.cubes__dot, classSecond, {
      [styles.cubes__dot__active]: activeDot === id,
    });

    return (
      <div
        key={id}
        role="button"
        aria-label="Dot"
        className={dotsClasses}
        checked={activeDot === id}
        onClick={() => changeActiveDots(id, rotY, rotX)}
      />
    );
  });

  const renderFaceData = boxFaceData.map(({ id, classSecond }) => (
    <div
      key={id}
      className={`${styles.cubes__boxes__3d_face} ${classSecond}`}
    />
  ));

  const cubeClasses = classNames(styles.cubes__space3d, {
    [styles.cubes__space3d__active]: isActiveFace,
  });

  return (
    <div className={styles.cubes}>
      {renderDots}
      <div
        role="button"
        className={cubeClasses}
        onTouchEnd={mouseLeaveCube}
        onMouseEnter={mouseEnterCube}
        onMouseLeave={mouseLeaveCube}
        onTouchStart={mouseEnterCube}
      >
        <div
          style={{ transform: `rotateX(${rotateX}) rotateY(${rotateY})` }}
          className={styles.cubes__boxes}
        >
          {renderFaceData}
        </div>
      </div>
    </div>
  );
};

export default Cubes;
