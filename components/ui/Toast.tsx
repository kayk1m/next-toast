import React from 'react';
import cn from 'classnames';
import styled from 'styled-components';
import { Transition } from '@headlessui/react';

import { Toast as ToastProps, useUI } from '@components/ui/context';

const Root = styled.div`
  padding: 1rem 2rem;
  background-color: skyblue;
  width: fit-content;
  margin-top: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;

  &.warning {
    background-color: red;
    color: white;
  }
`;

interface Props {
  toast: ToastProps;
}

const Toast: React.FC<Props> = ({ toast, ...props }) => {
  const [show, setShow] = React.useState<boolean>(false);
  const { removeToast } = useUI();

  React.useEffect(() => {
    setShow(toast.open);
  }, [toast.open]);

  return (
    <Transition
      show={show}
      enter="transition-all transform duration-300"
      enterFrom="translate-x-60"
      enterTo="translate-x-0"
      leave="transition-all transform duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Root
        className={cn({
          warning: toast.type === 'warning',
        })}
        onClick={() => removeToast(toast.id)}
        {...props}
      >
        {toast.content}
      </Root>
    </Transition>
  );
};

export default Toast;
