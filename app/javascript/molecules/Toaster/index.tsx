import React, { useCallback, useContext, useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import Toaster from './Toaster';
import { ToastProps } from './Toast';
import ToastContext from './context';

type AddToastAction = {
  type: 'add';
  toast: ToastProps;
};

type RemoveToastAction = {
  type: 'remove';
  id: string;
};

type ToastAction = AddToastAction | RemoveToastAction;

type UseToasterHook = () => { add: (toast: Omit<ToastProps, 'id'>) => void };

export const useToaster: UseToasterHook = () => {
  const { add } = useContext(ToastContext);

  return { add };
};

const ToasterProvider: React.FC = ({ children }) => {
  const [toasts, dispatch] = useReducer(
    (current: ToastProps[], { type, ...action }: ToastAction) => {
      switch (type) {
        case 'add':
          return [...current, (action as AddToastAction).toast];
        case 'remove':
          return current.filter(
            (toast) => toast.id !== (action as RemoveToastAction).id
          );
        default:
          return current;
      }
    },
    []
  );

  const add = useCallback(
    (toast: Omit<ToastProps, 'id'>): void => {
      const id = uuid();
      dispatch({ type: 'add', toast: { ...toast, id } });
    },
    [dispatch]
  );

  const remove = useCallback(
    (id: string): void => {
      dispatch({ type: 'remove', id });
    },
    [dispatch]
  );

  return (
    <ToastContext.Provider value={{ toasts, add, remove }}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  );
};

export default ToasterProvider;
