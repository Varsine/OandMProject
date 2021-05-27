import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class extends Document {
  render() {
    return (
      <Html lang="ru">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="/js/script.js" />
        </body>
      </Html>
    );
  }
}
