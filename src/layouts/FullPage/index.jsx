import React from 'react';
import PropTypes from 'prop-types';

import { SidebarMenu } from 'components/index';
import { FullPageContext } from 'context/index';
import { HeaderContainer, FooterContainer } from 'containers/index';

const FullPageLayout = ({ children, isOnePage, fullpageApi, inView }) => (
  <FullPageContext.Provider value={{ moveToSection: fullpageApi, inView }}>
    <HeaderContainer isOnePage={isOnePage} />
    {children}
    {!isOnePage && <SidebarMenu />}
    <FooterContainer isOnePage={isOnePage} />
  </FullPageContext.Provider>
);

FullPageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  isOnePage: PropTypes.bool,
  inView: PropTypes.bool,
  fullpageApi: PropTypes.object,
};

FullPageLayout.defaultProps = {
  inView: false,
  isOnePage: false,
  fullpageApi: {},
};

export default FullPageLayout;
