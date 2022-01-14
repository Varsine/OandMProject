import React, { useMemo } from 'react';
import Router from 'next/router';
import Script from 'next/script';
import PropTypes from 'prop-types';
import usePortal from 'react-useportal';
import withError from 'next-with-error';
import NextNprogress from 'nextjs-progressbar';

import 'styles/index.global.scss';
import 'react-multi-carousel/lib/styles.css';

import { wrapper } from 'libraries/index';
import { useIsomorphicLayoutEffect } from 'hooks/index';

import ErrorPage from './404';

const MyApp = ({ Component, pageProps }) => {
  const { Portal } = usePortal();

  const handleMouseUp = () => {
    window.document.body.classList.remove('mouse_animation');
  };

  const handleMouseDown = () => {
    window.document.body.classList.add('mouse_animation');
  };

  const canvasScript = useMemo(() => <Script src="/js/script.js" />, []);

  useIsomorphicLayoutEffect(() => {
    // eslint-disable-next-line no-console
    console.clear();

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

  return (
    <>
      <NextNprogress
        height="4"
        color="#094067"
        options={{ showSpinner: false }}
      />
      <Component {...pageProps} />
      <Portal>
        {canvasScript}
        <canvas id="canvas" width="100%" height="100%" />
      </Portal>
    </>
  );
};

MyApp.propTypes = {
  pageProps: PropTypes.object.isRequired,
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(withError(ErrorPage)(MyApp));
