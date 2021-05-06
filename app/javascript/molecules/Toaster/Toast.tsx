import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { Flipped } from 'react-flip-toolkit';
import ToastContext from './context';
import { Close as CloseIcon } from '../../atoms/Icon';

const TIMEOUT = 3000;

export interface ToastProps {
  id: string;
  contents: ReactNode;
}

const Toast: React.FC<ToastProps> = ({ id, contents }) => {
  const { remove } = useContext(ToastContext);

  const removeSelf = useCallback(() => remove(id), [remove, id]);

  const appear = (el) => {
    el.classList.add('toast--entering');
    el.style.removeProperty('opacity');
    setTimeout(() => el.classList.remove('toast--entering'), 500);
  };

  const exit = (el, _index, removeElement) => {
    el.classList.add('toast--exiting');
    el.style.transform = 'translateY(calc(-100% - 0.5rem))';
    setTimeout(() => {
      removeElement(el);
    }, 300);
  };

  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    timer.current = setTimeout(removeSelf, TIMEOUT);
    return () => {
      clearTimeout(timer.current);
    };
  }, [removeSelf]);

  return (
    <Flipped
      flipId={id}
      stagger
      opacity={false}
      onAppear={appear}
      onExit={exit}
    >
      <div className="toast" data-id={id}>
        <div className="toast__contents">{contents}</div>
        <button className="toast__close" onClick={removeSelf}>
          <CloseIcon />
        </button>
      </div>
    </Flipped>
  );
};

export default Toast;
