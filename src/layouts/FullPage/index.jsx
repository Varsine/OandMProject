import React from 'react';
import PropTypes from 'prop-types';

import { FullPageContext } from 'context/index';
import { HeaderContainer, FooterContainer } from 'containers/index';

const FullPageLayout = ({ children, fullpageApi }) => (
  <FullPageContext.Provider value={{ moveToSection: fullpageApi }}>
    <HeaderContainer />
    {children}
    <FooterContainer />
  </FullPageContext.Provider>
);

FullPageLayout.defaultProps = {
  fullpageApi: {},
};

FullPageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  fullpageApi: PropTypes.object,
};

export default FullPageLayout;
