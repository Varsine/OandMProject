import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { Input } from 'components/index';
import { activeIndexSelector } from 'slices/mainSlice';

import { dotsData, boxFaceData } from './constants';
import styles from './JoinOurTeam.scss';

const Cubes = () => {
  const activeIndex = useSelector(activeIndexSelector);
  const cubeRotateRef = useRef(null);
  const isActiveSection = activeIndex === 7;

  const [rotateX, setRotateX] = useState('0deg');
  const [rotateY, setRotateY] = useState('0deg');
  const [activeDot, setActiveDot] = useState(1);

  const nextCubFace = () => {
    if (activeDot === 6) {
      setActiveDot(1);
    } else {
      setActiveDot(activeDot + 1);
    }
  };

  const changeActiveDots = (id, x, y) => {
    setActiveDot(id);
    setRotateX(x);
    setRotateY(y);
    clearTimeout(cubeRotateRef.current);
  };

  useEffect(() => {
    if (isActiveSection) {
      const { rotY, rotX } = dotsData[activeDot - 1];
      setRotateX(rotX);
      setRotateY(rotY);
      cubeRotateRef.current = setTimeout(nextCubFace, 2000);
    }
  }, [isActiveSection, activeDot]);

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

  return (
    <div className={styles.cubes}>
      {renderDots}
      <div role="button" className={styles.cubes__space3d}>
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
