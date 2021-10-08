import React from 'react';
import ReactFullPage from '@fullpage/react-fullpage';

import { applySections } from 'utils/index';
import { FullPageLayout } from 'layouts/index';

const ApplyContainer = () => {
  const renderFullPages = applySections.map((fullPage) => (
    <fullPage.component key={fullPage.id} />
  ));

  const renderFullPageContent = ({ fullpageApi }) => (
    <ReactFullPage.Wrapper>
      <FullPageLayout fullpageApi={fullpageApi} isOnePage>
        {renderFullPages}
      </FullPageLayout>
    </ReactFullPage.Wrapper>
  );

  return (
    <ReactFullPage
      navigation={false}
      scrollingSpeed={1300}
      keyboardScrolling={false}
      fitToSection={false}
      fixedElements="#canvas"
      render={renderFullPageContent}
    />
  );
};

export default ApplyContainer;
