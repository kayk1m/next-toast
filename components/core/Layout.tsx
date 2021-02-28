import React from 'react';
// import cn from 'classnames';
import styled from 'styled-components';

const Root = styled.div``;

const Main = styled.main``;

const Layout: React.FC = ({ children }) => {
  return (
    <Root>
      <Main>{children}</Main>
    </Root>
  );
};

export default Layout;
