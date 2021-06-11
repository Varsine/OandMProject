import React from 'react';
import PropTypes from 'prop-types';

import { FullPageContext } from 'context/index';
import { HeaderContainer, FooterContainer } from 'containers/index';

const FullPageLayout = ({ children, fullpageApi, isOnePage }) => (
  <FullPageContext.Provider value={{ moveToSection: fullpageApi }}>
    <HeaderContainer isOnePage={isOnePage} />
    {children}
    <FooterContainer isOnePage={isOnePage} />
  </FullPageContext.Provider>
);

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
