import React from 'react';
import ReactFullPage from '@fullpage/react-fullpage';

import { mainSections } from 'utils/index';

const HomeContainer = () => {
  const renderFullPages = mainSections.map((fullPage) => (
    <fullPage.component key={fullPage.id} />
  ));

  return (
    <main>
      <ReactFullPage
        navigation={false}
        scrollingSpeed={1300}
        keyboardScrolling={false}
        // onLeave={onLeave}
        fitToSection={false}
        fixedElements=""
        render={() => (
          <ReactFullPage.Wrapper>{renderFullPages}</ReactFullPage.Wrapper>
        )}
      />
    </main>
  );
};

export default HomeContainer;
