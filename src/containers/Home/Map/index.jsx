import React, { useState, useEffect, useCallback } from 'react';
import {
  Marker,
  GoogleMap,
  InfoWindow,
  withScriptjs,
  withGoogleMap,
} from 'react-google-maps';

import { MAP_KEY } from 'constants/index';
import { mapStyles } from 'utils/index';

import styles from './Map.scss';

const InjectableGoogleMap = () => {
  const [selectedPark, setSelectedPark] = useState(false);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === 'Escape') {
        setSelectedPark(null);
      }
    };
    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);

  const handleMarkerClick = useCallback(() => {
    setSelectedPark(!selectedPark);
  }, [selectedPark]);

  const handleCloseClick = () => {
    setSelectedPark(null);
  };

  return (
    <GoogleMap
      defaultZoom={16}
      defaultCenter={{ lat: 40.167782, lng: 44.503009 }}
      options={{
        styles: mapStyles,
      }}
    >
      <Marker
        onClick={handleMarkerClick}
        position={{ lat: 40.167782, lng: 44.503009 }}
        icon={{
          url: '/images/marker.svg',
          scaledSize: new window.google.maps.Size(50, 50),
        }}
      >
        {selectedPark && (
          <InfoWindow
            onCloseClick={handleCloseClick}
            position={{ lat: 40.167847, lng: 44.502914 }}
          >
            <div className={styles.map_global}>
              <h3 className={styles.map_global_style}>ShellLogix LLC</h3>
              <p className={styles.map_global_style}>
                Software Development Company
              </p>
              <p className={styles.map_global_style}>Bryusov 30 street</p>
            </div>
          </InfoWindow>
        )}
      </Marker>
    </GoogleMap>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(InjectableGoogleMap));

const Map = () => (
  <section className={`${styles.wrapper} section`}>
    <div className={styles.wrapper__layout}>
      <WrappedMap
        mapElement={<div style={{ height: `100%` }} />}
        loadingElement={<div style={{ height: `100%` }} />}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${MAP_KEY}`}
        containerElement={<div className={styles.wrapper__layout_container} />}
      />
      <div className={styles.wrapper__layout_info}>
        <div className={styles.wrapper__layout_info_address}>
          <p className={styles.wrapper__layout_info_title}>YEREVAN</p>
          <h2 className={styles.wrapper__layout_info_text}>
            30 Bryusov Street
          </h2>
        </div>
        <div className={styles.wrapper__layout_info_phone}>
          <p className={styles.wrapper__layout_info_title}>PHONE NUMBER</p>
          <a
            href="tel:+37441013032"
            className={styles.wrapper__layout_info_text}
          >
            +374 41013032
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default Map;
