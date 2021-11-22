import React, { useCallback, useEffect, useMemo } from 'react';
import ReactFullPage from '@fullpage/react-fullpage';
import { useDispatch } from 'react-redux';

import { IS_SERVER } from 'constants/index';
import { mainSections } from 'utils/index';
import { useWindowSize } from 'hooks/index';
import { changeIndex } from 'slices/mainSlice';
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

  const renderFullPages = useMemo(
    () =>
      mainSections.map((fullPage) => <fullPage.component key={fullPage.id} />),
    [],
  );

  const renderFullPageContent = useCallback(
    ({ fullpageApi }) => (
      <ReactFullPage.Wrapper>
        <FullPageLayout fullpageApi={fullpageApi}>
          {renderFullPages}
        </FullPageLayout>
      </ReactFullPage.Wrapper>
    ),
    [renderFullPages],
  );

  return (
    <ReactFullPage
      navigation={false}
      fitToSection={false}
      scrollingSpeed={1300}
      keyboardScrolling={false}
      onLeave={changeActiveStep}
      render={renderFullPageContent}
    />
  );
};

export default HomeContainer;
