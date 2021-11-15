import React, { useState, useCallback } from 'react';
import classNames from 'classnames';

import styles from './JoinOurTeam.scss';
import { dotsData, boxFaceData } from './constants';

const Cubes = () => {
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [isDots, setIsDots] = useState(false);
  const [activeDot, setActiveDot] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  const transform = isDots
    ? ''
    : `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(0deg)`;

  const onMouseDown = () => {
    setIsDragging(true);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = useCallback(
    (e) => {
      if (isDragging) {
        setIsDots(false);
        setActiveDot(0);
        setRotX(rotX - e.movementY);
        setRotY(rotY + e.movementX);
      }
    },
    [isDragging, rotX, rotY],
  );

  const changeActiveDots = (id) => {
    setActiveDot(id);
    setIsDragging(false);
    setIsDots(true);
  };

  const renderDots = dotsData.map(({ id, classFirst, classSecond }) => (
    <input
      key={id}
      type="radio"
      onClick={() => changeActiveDots(id)}
      checked={activeDot === id}
      className={`${classFirst} ${classSecond}`}
      name="select-face"
    />
  ));

  const renderFaceData = boxFaceData.map(({ id, classFirst, classSecond }) => (
    <div key={id} className={`${classFirst} ${classSecond}`} />
  ));

  return (
    <div className={styles.cubes}>
      {renderDots}
      <div
        role="button"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
        className={styles.cubes__space3d}
      >
        <div
          role="button"
          style={{
            transform,
          }}
          className={classNames(styles.cubes__boxes, {
            [styles.cubes__boxes__transit]: isDots,
          })}
        >
          {renderFaceData}
        </div>
      </div>
    </div>
  );
};

export default Cubes;
