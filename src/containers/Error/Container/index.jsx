import React from 'react';
import ReactFullPage from '@fullpage/react-fullpage';

import { errorSection } from 'utils/index';
import { FullPageLayout } from 'layouts/index';

const ErrorContainer = () => {
  const renderFullPages = errorSection.map((fullPage) => (
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
      render={renderFullPageContent}
    />
  );
};

export default ErrorContainer;
