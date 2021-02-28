import React from 'react';
import styled from 'styled-components';

// importing components
import { Head } from '@components/core';

// importing libraries

const Root = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>My Home Page</title>
      </Head>
      <Root>hello world</Root>
    </>
  );
};

export default Home;
