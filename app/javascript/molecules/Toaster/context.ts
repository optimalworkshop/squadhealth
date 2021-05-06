import { createContext } from 'react';
import { ToastProps } from './Toast';

export interface ToastContextProps {
  toasts: ToastProps[];
  add?: (toast: Omit<ToastProps, 'id'>) => void;
  remove?: (id: string) => void;
}

const ToastContext = createContext<ToastContextProps>({ toasts: [] });

export default ToastContext;
