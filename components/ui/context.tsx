import React from 'react';

export type Toast = {
  id: string;
  type: 'default' | 'warning';
  content: string;
};

export interface State {
  toastQueue: Toast[];
}

export interface StateWithActions extends State {
  addToast: (newToast: Toast) => void;
  removeToast: (id: string) => void;
}

const initialState: State = {
  toastQueue: [],
};

const initialStateWithActions: StateWithActions = {
  ...initialState,
  addToast: () => {},
  removeToast: () => {},
};

type Action =
  | {
      type: 'ADD_TOAST';
      toast: Toast;
    }
  | {
      type: 'REMOVE_TOAST';
      id: string;
    };

export const UIContext = React.createContext<StateWithActions>(
  initialStateWithActions,
);

const uiReducer: (state: State, action: Action) => State = (state, action) => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toastQueue: [...state.toastQueue, action.toast],
      };
    case 'REMOVE_TOAST':
      return {
        ...state,
        toastQueue: state.toastQueue.filter((toast) => toast.id !== action.id),
      };
  }
};

export const UIProvider: React.FC = ({ ...props }) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);
  const addToast = (newToast: Toast) =>
    dispatch({ type: 'ADD_TOAST', toast: newToast });
  const removeToast = (id: string) => dispatch({ type: 'REMOVE_TOAST', id });

  const value: StateWithActions = React.useMemo(
    () => ({
      ...state,
      addToast,
      removeToast,
    }),
    [state],
  );

  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider.');
  }

  return context;
};

export const ManagedUIContext: React.FC = ({ children }) => (
  <UIProvider>{children}</UIProvider>
);

export default ManagedUIContext;
