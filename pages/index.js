import React from 'react';

import { HelmetLayout } from 'layouts/index';
import { HomeContainer } from 'containers/index';

const HomePage = () => (
  <HelmetLayout title="Home" metaDescription="Home page">
    <HomeContainer />
  </HelmetLayout>
);

HomePage.getInitialProps = async () => {
  return {};
};

export default HomePage;
