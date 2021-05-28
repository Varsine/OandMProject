import React, { useEffect } from 'react';
import App from 'next/app';
import Router from 'next/router';
import PropTypes from 'prop-types';
import withError from 'next-with-error';
import NextNprogress from 'nextjs-progressbar';

import 'styles/index.global.scss';

import { I18nContext } from 'context/index';
import { wrapper } from 'libraries/index';

import ErrorPage from './404';

import { appWithTranslation, withTranslation } from '../i18n';

const MyApp = ({ Component, pageProps, t }) => {
  useEffect(() => {
    Router.events.on('routeChangeComplete', () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    });
  }, []);

  return (
    <I18nContext.Provider value={t}>
      <NextNprogress
        height="4"
        color="#094067"
        options={{ showSpinner: false }}
      />
      <Component {...pageProps} />
    </I18nContext.Provider>
  );
};

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

MyApp.propTypes = {
  t: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(
  withError(ErrorPage)(appWithTranslation(withTranslation('common')(MyApp))),
);
