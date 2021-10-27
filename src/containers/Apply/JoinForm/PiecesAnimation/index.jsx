import React, { useState } from 'react';
import classNames from 'classnames';

import { calculatePiecesPosition } from 'utils/index';

import styles from './PiecesAnimation.scss';

const PiecesAnimation = () => {
  const [isAnimate, setIsAnimate] = useState(false);

  const piecesList = Array.from({ length: 168 }, (_, i) => ({
    id: i + 1,
  }));

  const renderPiecesList = piecesList
    // ${styles.cut_images_containerTL__cubs}
    .map(({ id }, index) => (
      <div
        key={id}
        role="button"
        aria-label="img"
        className={`${styles.cut_images_item}`}
        style={{
          backgroundPosition: calculatePiecesPosition(index),
        }}
      />
    ));

  return (
    <div
      role="button"
      onClick={() => setIsAnimate(!isAnimate)}
      className={classNames(styles.cut_images, {
        [styles.cut_images_active]: isAnimate,
      })}
    >
      {renderPiecesList}
    </div>
  );
};

PiecesAnimation.propTypes = {};

export default PiecesAnimation;
