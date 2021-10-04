import React, { useEffect } from 'react';
import App from 'next/app';
import Router from 'next/router';
import PropTypes from 'prop-types';
import withError from 'next-with-error';
import NextNprogress from 'nextjs-progressbar';

import 'styles/index.global.scss';
import 'swiper/swiper.min.css';

import 'swiper/swiper-bundle.min.css';

import { wrapper } from 'libraries/index';
import { useDarkMode } from 'hooks/index';

import ErrorPage from './404';

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    Router.events.on('routeChangeComplete', () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    });
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
