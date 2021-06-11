import React from 'react';
import ReactFullPage from '@fullpage/react-fullpage';
import { useDispatch } from 'react-redux';

import { changeIndex } from 'slices/mainSlice';
import { applySections } from 'utils/index';
import { FullPageLayout } from 'layouts/index';

const ApplyContainer = () => {
  const dispatch = useDispatch();

  const renderFullPages = applySections.map((fullPage) => (
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
      fixedElements="#canvas"
      render={({ fullpageApi }) => (
        <ReactFullPage.Wrapper>
          <FullPageLayout fullpageApi={fullpageApi} isOnePage>
            {renderFullPages}
          </FullPageLayout>
        </ReactFullPage.Wrapper>
      )}
    />
  );
};

export default ApplyContainer;
