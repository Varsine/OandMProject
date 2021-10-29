import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

// import { IS_SERVER } from 'constants/index';

const HelmetLayout = ({ children, title, metaDescription }) => (
  <>
    <Head>
      {title && <title>{title}</title>}
      {metaDescription && <meta name="description" content={metaDescription} />}
      {/* {!IS_SERVER && <script src="/js/script.js" />} */}
    </Head>
    {children}
    {/* {!IS_SERVER && <canvas id="canvas" />} */}
  </>
);

HelmetLayout.defaultProps = {
  title: '',
  metaDescription: '',
};

HelmetLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  metaDescription: PropTypes.string,
};

export default HelmetLayout;
