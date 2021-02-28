import '@assets/main.css';
import 'nprogress/nprogress.css';

import React from 'react';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';

import { Head } from '@components/core';
import ManagedUIContext from '@components/ui/context';

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 500,
  showSpinner: false,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const Noop: React.FC = ({ children }) => <>{children}</>;

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Layout = (Component as any).Layout || Noop;

  return (
    <ManagedUIContext>
      <Head />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ManagedUIContext>
  );
};

export default App;
