import React from 'react';

import { HelmetLayout } from 'layouts/index';
import { HomeContainer } from 'containers/index';

const HomePage = () => (
  <HelmetLayout
    title="ShellLogix LLC"
    metaDescription="
  ShellLogix LLC has been established in 2017 with a mission to 
  offer creative solutions in the field of We believe that contemporary ideas and technologies are the key
          milestones for creating strategic solutions for traditions based
          businesses.Our team members are fully engaged in the process of
          content making and have got unique affection for their job. One of
          the main advantages of our company is the productivity based working
          structure which is our straight response to the time and spendings
          of our clients as we highly estimate your choice and trust in us"
  >
    <HomeContainer />
  </HelmetLayout>
);

export default HomePage;
