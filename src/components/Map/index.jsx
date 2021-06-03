import React from 'react';

import styles from './Map.scss';

const Map = () => {
  return (
    <section className="section">
      <div className="canvas__working" />
      <div className={styles.wrapper}>Map</div>
    </section>
  );
};

export default Map;
