import React from 'react';
import styled from 'styled-components';

import { useUI } from '@components/ui/context';
import { Toast } from '@components/ui';

const Root = styled.div`
  overflow: hidden;
`;

const Main = styled.main``;

const Layout: React.FC = ({ children }) => {
  const { toastQueue } = useUI();
  let toastIndex = 0;

  return (
    <Root>
      <Main>{children}</Main>
      <div className="fixed right-4 bottom-4 flex flex-col-reverse">
        {toastQueue
          .map((toast) => {
            if (toast.open) toastIndex += 1;
            return {
              ...toast,
              index: toastIndex,
            };
          })
          .map((toast, idx) => (
            <Toast key={`toast-${idx}`} toast={toast} />
          ))}
      </div>
    </Root>
  );
};

export default Layout;
