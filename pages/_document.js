import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';

import { GA_MEASUREMENT_ID } from 'constants/index';

export default class extends Document {
  render() {
    return (
      <Html lang="ru">
        <Head>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="favicon.ico" />
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="apple-touch-icon"
            href="/static/icon/apple-touch-icon-192.png"
          />
          <meta name="theme-color" content="#09090a" />
          <meta property="og:type" content="website" />
          <meta
            name="keywords"
            content="ShellLogix, website, mobile application, graphic design, web design, 
            website design, website builder, web developer, web designer, webdesign, ecommerce website, 
            web design company, website creator, website designer, responsive web design, web development company,
            best website design, web design software, web page design, build a website, web developer salary, 
            design website, web application development, web agency, software development company, web programming, 
            web developer jobs, website developer, graphic design websites, web developers, web development tools, 
            developpeur web, how to develop a website, top website designs, website company, website design and development
            web company, how to become a web developer, front end web developer, website making"
          />
          <meta name="author" content="ShellLogix" />
          <meta property="og:site_name" content="Shelllogix.com" />
          <meta
            property="og:description"
            content="
            ShellLogix LLC has been established in 2017 with a mission to 
            offer creative solutions in the field of We believe that contemporary ideas and technologies are the key
            milestones for creating strategic solutions for traditions based
            businesses.Our team members are fully engaged in the process of
            content making and have got unique affection for their job. One of
            the main advantages of our company is the productivity based working
            structure which is our straight response to the time and spendings
            of our clients as we highly estimate your choice and trust in us"
          />
          <meta property="og:image" content="/images/logo.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
