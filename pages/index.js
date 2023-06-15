import React from 'react';

import { HelmetLayout } from 'layouts/index';
import { HomeContainer } from 'containers/index';

const HomePage = () => (
  <HelmetLayout
    title="O&M Service LLC"
    metaDescription="
    O&M Service LLC Utilizing expert technicians, we support ongoing service and maintenance, including 24/7 availability. Whether you require routine maintenance or consultation regarding a new area of concern, O&M LLC is readily available for the lifetime of your building.
    Measurement & Verification. Our company has  started work since 2016 and has about 100 employees."
  >
    <HomeContainer />
  </HelmetLayout>
);

export default HomePage;
