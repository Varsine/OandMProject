import React, { useEffect } from 'react';
import ReactFullPage from '@fullpage/react-fullpage';
import { useDispatch } from 'react-redux';

import { IS_SERVER } from 'constants/index';
import { changeIndex } from 'slices/mainSlice';
import { mainSections } from 'utils/index';
import { useWindowSize } from 'hooks/index';
import { FullPageLayout } from 'layouts/index';

const HomeContainer = () => {
  const dispatch = useDispatch();
  const { isLaptop } = useWindowSize();

  useEffect(() => {
    if (!IS_SERVER) {
      if (isLaptop) {
        window.fullpage_api.setAutoScrolling(false);
      } else {
        window.fullpage_api.setAutoScrolling(true);
      }
    }
  }, [isLaptop]);

  const changeActiveStep = (section, destination) => {
    dispatch(changeIndex(destination.index + 1));
  };

  const renderFullPages = mainSections.map((fullPage) => (
    <fullPage.component key={fullPage.id} />
  ));

  const renderFullPageContent = ({ fullpageApi }) => (
    <ReactFullPage.Wrapper>
      <FullPageLayout fullpageApi={fullpageApi}>
        {renderFullPages}
      </FullPageLayout>
    </ReactFullPage.Wrapper>
  );

  return (
    <ReactFullPage
      navigation={false}
      scrollingSpeed={1300}
      keyboardScrolling={false}
      onLeave={changeActiveStep}
      fitToSection={false}
      render={renderFullPageContent}
    />
  );
};

export default HomeContainer;
