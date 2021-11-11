import React, { useState, useEffect } from 'react';
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

  return (
    <GoogleMap
      defaultZoom={16}
      defaultCenter={{ lat: 40.167782, lng: 44.503009 }}
      options={{
        styles: mapStyles[mapStyles && 'dark'],
      }}
    >
      <Marker
        position={{ lat: 40.167782, lng: 44.503009 }}
        onClick={() => {
          setSelectedPark(!selectedPark);
        }}
        icon={{
          url: '',
          scaledSize: new window.google.maps.Size(50, 50),
        }}
      >
        {selectedPark && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedPark(null);
            }}
            position={{ lat: 40.167847, lng: 44.502914 }}
          >
            <div style={{ marginTop: -4 }}>
              <h3 style={{ marginTop: 5 }}>ShellLogix LLC</h3>
              <p style={{ marginTop: 5 }}>Software Development Company</p>
              <p style={{ marginTop: 5 }}>Bryusov 30 street</p>
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
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${MAP_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div className={styles.wrapper__layout_container} />}
        mapElement={<div style={{ height: `100%` }} />}
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
