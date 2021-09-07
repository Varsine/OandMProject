import React from 'react';
import ReactFullPage from '@fullpage/react-fullpage';
import { useDispatch } from 'react-redux';

import { changeIndex } from 'slices/mainSlice';
import { mainSections } from 'utils/index';
import { FullPageLayout } from 'layouts/index';

const HomeContainer = () => {
  const dispatch = useDispatch();

  const renderFullPages = mainSections.map((fullPage) => (
    <fullPage.component key={fullPage.id} />
  ));

  const changeActiveStep = (section, destination) => {
    dispatch(changeIndex(destination.index + 1));
  };

  const pluginWrapper = () => {
    // eslint-disable-next-line global-require
    require('fullpage.js/vendors/scrolloverflow');
  };

  return (
    <ReactFullPage
      pluginWrapper={pluginWrapper}
      navigation={false}
      scrollingSpeed={1300}
      keyboardScrolling={false}
      onLeave={changeActiveStep}
      fitToSection={false}
      fixedElements="#canvas"
      scrollOverflow
      normalScrollElements=".section"
      render={({ fullpageApi }) => (
        <ReactFullPage.Wrapper>
          <FullPageLayout fullpageApi={fullpageApi}>
            {renderFullPages}
          </FullPageLayout>
        </ReactFullPage.Wrapper>
      )}
    />
  );
};

export default HomeContainer;
