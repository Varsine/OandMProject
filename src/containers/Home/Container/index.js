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
    if (!isLaptop && window.splatStack) {
      window.splatStack.push(Math.random() * 1 + 4);
    }
    dispatch(changeIndex(destination.index + 1));
  };

  const renderFullPageContent = ({ fullpageApi }) => (
    <ReactFullPage.Wrapper>
      <FullPageLayout fullpageApi={fullpageApi}>
        {mainSections.map((fullPage) => (
          <fullPage.component key={fullPage.id} />
        ))}
      </FullPageLayout>
    </ReactFullPage.Wrapper>
  );

  return (
    <ReactFullPage
      navigation={false}
      fitToSection={false}
      scrollingSpeed={1300}
      keyboardScrolling={false}
      scrollHorizontally={false}
      onLeave={changeActiveStep}
      render={renderFullPageContent}
    />
  );
};

export default HomeContainer;
