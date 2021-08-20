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

  return (
    <ReactFullPage
      navigation={false}
      scrollingSpeed={1300}
      keyboardScrolling={false}
      onLeave={changeActiveStep}
      fitToSection={false}
      // autoScrolling={false}
      fixedElements="#canvas"
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
