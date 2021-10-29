import React from 'react';

import { changeIndex } from 'slices/mainSlice';
import { HelmetLayout } from 'layouts/index';
import { ApplyContainer } from 'containers/index';

const ApplyPage = () => (
  <HelmetLayout
    title="ShellLogix LLC"
    metaDescription="join us  ShellLogixTeam"
  >
    <ApplyContainer />
  </HelmetLayout>
);

ApplyPage.getInitialProps = async (ctx) => {
  const { store } = ctx;
  const { dispatch } = store;
  await dispatch(changeIndex(1));

  return {};
};

export default ApplyPage;
