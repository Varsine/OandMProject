import React from 'react';
// import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { SidebarMenu } from 'components/index';
import { FullPageContext } from 'context/index';
import { HeaderContainer, FooterContainer } from 'containers/index';
// import useWindowSize from 'hooks/useWindowSize';

const FullPageLayout = ({ children, fullpageApi, isOnePage }) => {
  // const [isScroll, setIsScroll] = useState(false);
  // const { isDesktop } = useWindowSize();
  // const ref = useRef(true);
  // useEffect(() => {
  //   if (ref.current !== isDesktop && fullpageApi?.setResponsive) {
  //     // eslint-disable-next-line no-unused-expressions
  //     fullpageApi?.setResponsive(!isDesktop);
  //     ref.current = isDesktop;
  //   }
  // }, [isDesktop]);

  // console.log(fullpageApi, isDesktop, 'fullpageApi');

  return (
    <FullPageContext.Provider value={{ moveToSection: fullpageApi }}>
      <HeaderContainer />
      {children}
      <SidebarMenu />
      <FooterContainer isOnePage={isOnePage} />
    </FullPageContext.Provider>
  );
};
FullPageLayout.defaultProps = {
  fullpageApi: {},
  isOnePage: false,
};

FullPageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  isOnePage: PropTypes.bool,
  fullpageApi: PropTypes.object,
};

export default FullPageLayout;
