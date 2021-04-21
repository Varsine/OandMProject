import React from 'react';

import { HelmetLayout } from 'layouts/index';
import { HomeContainer } from 'containers/index';
import { swipeActions } from 'store/actions';

const HomePage = (props) => (
  <HelmetLayout title="Home" metaDescription="Home page">
    <HomeContainer {...props} />
  </HelmetLayout>
);

HomePage.getInitialProps = async (ctx) => {
  const { dispatch } = ctx.store;

  await dispatch(swipeActions.getTokenList());
  return {};
};

export default HomePage;
