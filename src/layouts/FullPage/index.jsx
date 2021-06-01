import React from 'react';
import PropTypes from 'prop-types';

import Mouse from 'components/Mouse'; // importi het kapvac xndir ka
import { FullPageContext } from 'context/index';
import { HeaderContainer, FooterContainer } from 'containers/index';

const FullPageLayout = ({ children, fullpageApi }) => (
  <FullPageContext.Provider value={{ moveToSection: fullpageApi }}>
    <HeaderContainer />
    {children}
    <Mouse />
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
