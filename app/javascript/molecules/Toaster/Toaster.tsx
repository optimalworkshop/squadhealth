import React, { useRef, useEffect, useContext, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Flipper, Flipped } from 'react-flip-toolkit';
import ToastContext from './context';
import Toast from './Toast';

const Toaster: React.FC = () => {
  const container = useRef<HTMLDivElement>();

  const { toasts } = useContext(ToastContext);

  const toastIds = useMemo(() => toasts.map((toast) => toast.id), [toasts]);

  useEffect(() => {
    container.current = document.createElement('div');
    container.current.classList.add('toaster__portal');
    document.body.appendChild(container.current);
    return () => {
      document.body.removeChild(container.current);
    };
  }, []);

  if (!container.current) return null;

  return createPortal(
    <div className="toaster">
      <Flipper
        flipKey={toastIds.join(',')}
        spring="wobbly"
        decisionData={toastIds}
        staggerConfig={{
          default: {
            reverse: true,
            speed: 0.05,
          },
        }}
        handleEnterUpdateDelete={async ({
          hideEnteringElements,
          animateEnteringElements,
          animateExitingElements,
          animateFlippedElements,
        }) => {
          hideEnteringElements();
          await animateExitingElements();
          animateEnteringElements();
          await animateFlippedElements();
        }}
      >
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
        <Flipped flipId="dummy">
          <div className="toaster__dummy" />
        </Flipped>
      </Flipper>
    </div>,
    container.current
  );
};

export default Toaster;
