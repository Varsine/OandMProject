import React, { useEffect } from 'react';
import App from 'next/app';
import Router from 'next/router';
import PropTypes from 'prop-types';
import withError from 'next-with-error';
import NextNprogress from 'nextjs-progressbar';

import 'styles/index.global.scss';
import 'swiper/swiper.min.css';
import 'react-multi-carousel/lib/styles.css';

import 'swiper/swiper-bundle.min.css';

import { wrapper } from 'libraries/index';
import { IS_SERVER } from 'constants/globalConstants';
import { useDarkMode } from 'hooks/index';

import ErrorPage from './404';

const MyApp = ({ Component, pageProps }) => {
  const handleMouseUp = () => {
    window.document.body.classList.remove('mouse_animation');
  };

  const handleMouseDown = () => {
    window.document.body.classList.add('mouse_animation');
  };

  useEffect(() => {
    Router.events.on('routeChangeComplete', () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    });

    window.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

    window.addEventListener('mousedown', () => {
      window.document.body.style.cursor = "url('/images/Mouse2.png'), auto";
    });

    window.addEventListener('mouseup', () => {
      window.document.body.style.cursor = "url('/images/Mouse.png'), auto";
    });

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useDarkMode();

  return (
    <>
      <NextNprogress
        height="4"
        color="#094067"
        options={{ showSpinner: false }}
      />
      <Component {...pageProps} />
      {!IS_SERVER && <canvas id="canvas" />}

      {/* <canvas id="something" /> */}
    </>
  );
};

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

MyApp.propTypes = {
  pageProps: PropTypes.object.isRequired,
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(withError(ErrorPage)(MyApp));
