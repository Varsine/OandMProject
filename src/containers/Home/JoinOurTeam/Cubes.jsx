import React, { useState, useEffect, useRef, useMemo } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { Input } from 'components/index';
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

  const renderDots = dotsData.map(
    ({ id, rotY, rotX, classFirst, classSecond }) => (
      <Input
        key={id}
        type="radio"
        name="select-face"
        checked={activeDot === id}
        onChange={() => changeActiveDots(id, rotY, rotX)}
        className={`${classFirst} ${classSecond}`}
      />
    ),
  );

  const renderFaceData = boxFaceData.map(({ id, classFirst, classSecond }) => (
    <div key={id} className={`${classFirst} ${classSecond}`} />
  ));

  const cubeClasses = useMemo(
    () =>
      classNames(styles.cubes__space3d, {
        [styles.cubes__space3d__active]: isActiveFace,
      }),
    [isActiveFace],
  );

  return (
    <div className={styles.cubes}>
      {renderDots}
      <div
        role="button"
        onMouseEnter={mouseEnterCube}
        onMouseLeave={mouseLeaveCube}
        onTouchStart={mouseEnterCube}
        onTouchEnd={mouseLeaveCube}
        className={cubeClasses}
      >
        <div
          role="button"
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
