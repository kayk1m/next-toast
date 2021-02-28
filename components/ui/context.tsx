import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_TOAST_EXPIRES_IN = 10;

export type Toast = {
  id: string;
  type: 'default' | 'warning';
  open: boolean;
  content: string;
};

export interface State {
  toastQueue: Toast[];
}

export interface StateWithActions extends State {
  addToast: (
    toastConfig:
      | string
      | {
          type: 'default' | 'warning';
          expiresIn: number;
          content: string;
        },
  ) => void;
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
      type: 'SHOW_TOAST';
      id: string;
    }
  | {
      type: 'REMOVE_TOAST';
      id: string;
    }
  | {
      type: 'HIDE_TOAST';
      id: string;
    };

export const UIContext = React.createContext<StateWithActions>(
  initialStateWithActions,
);

const uiReducer: (state: State, action: Action) => State = (state, action) => {
  switch (action.type) {
    case 'ADD_TOAST':
      console.log('add-toast');
      return {
        ...state,
        toastQueue: [...state.toastQueue, action.toast],
      };
    case 'SHOW_TOAST':
      console.log('show-toast', action.id);
      return {
        ...state,
        toastQueue: state.toastQueue.map((toast) => {
          if (toast.id === action.id) {
            if (toast.open) {
              return {
                ...toast,
                open: true,
              };
            }
          }

          return toast;
        }),
      };
    case 'HIDE_TOAST':
      console.log('hide-toast');
      return {
        ...state,
        toastQueue: state.toastQueue.map((toast) => {
          if (toast.id === action.id) {
            if (toast.open) {
              return {
                ...toast,
                open: false,
              };
            }
          }

          return toast;
        }),
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

  const removeToast = React.useCallback(
    (id: string) => dispatch({ type: 'HIDE_TOAST', id }),
    [],
  );
  const addToast = React.useCallback(
    (
      initializer:
        | string
        | {
            type: 'default' | 'warning';
            expiresIn: number;
            content: string;
          },
    ) => {
      const id = uuidv4();
      if (typeof initializer === 'string') {
        dispatch({
          type: 'ADD_TOAST',
          toast: { id, type: 'default', open: true, content: initializer },
        });

        setTimeout(() => removeToast(id), DEFAULT_TOAST_EXPIRES_IN * 1000);
      } else {
        dispatch({
          type: 'ADD_TOAST',
          toast: {
            id,
            type: initializer.type,
            open: true,
            content: initializer.content,
          },
        });

        const { expiresIn } = initializer;

        if (expiresIn > 0) {
          setTimeout(() => removeToast(id), expiresIn * 1000);
        }
      }
    },
    [removeToast],
  );

  const value: StateWithActions = React.useMemo(
    () => ({
      ...state,
      addToast,
      removeToast,
    }),
    [state, addToast, removeToast],
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
