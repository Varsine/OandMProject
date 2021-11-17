import React, { useState } from 'react';
import classNames from 'classnames';

import { Input } from 'components/index';

import { dotsData, boxFaceData } from './constants';
import styles from './JoinOurTeam.scss';

const Cubes = () => {
  const [isDots, setIsDots] = useState(false);
  const [activeDot, setActiveDot] = useState(1);

  const changeActiveDots = (id) => {
    setActiveDot(id);
    setIsDots(true);
  };

  const renderDots = dotsData.map(({ id, classFirst, classSecond }) => (
    <Input
      key={id}
      type="radio"
      name="select-face"
      checked={activeDot === id}
      onChange={() => changeActiveDots(id)}
      className={`${classFirst} ${classSecond}`}
    />
  ));

  const renderFaceData = boxFaceData.map(({ id, classFirst, classSecond }) => (
    <div key={id} className={`${classFirst} ${classSecond}`} />
  ));

  return (
    <div className={styles.cubes}>
      {renderDots}
      <div role="button" className={styles.cubes__space3d}>
        <div
          role="button"
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
