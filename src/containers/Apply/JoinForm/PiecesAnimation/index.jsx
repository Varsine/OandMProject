import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { noop, calculatePiecesPosition } from 'utils/index';

import styles from './PiecesAnimation.scss';

const PiecesAnimation = ({ isAnimate, animClickHanlder }) => {
  const piecesList = Array.from({ length: 168 }, (_, i) => ({
    id: i + 1,
  }));

  const renderPiecesList = useMemo(() =>
    piecesList.map(({ id }, index) => (
      <div
        key={id}
        role="button"
        aria-label="img"
        className={`${styles.cut_images_item}`}
        style={{
          backgroundPosition: calculatePiecesPosition(index),
        }}
      />
    )),
  );

  return (
    <div
      role="button"
      onClick={animClickHanlder}
      className={classNames(styles.cut_images, {
        [styles.cut_images_active]: isAnimate,
      })}
    >
      {renderPiecesList}
    </div>
  );
};

PiecesAnimation.propTypes = {
  isAnimate: PropTypes.bool,
  animClickHanlder: PropTypes.func,
};

PiecesAnimation.defaultProps = {
  isAnimate: false,
  animClickHanlder: noop,
};

export default PiecesAnimation;
