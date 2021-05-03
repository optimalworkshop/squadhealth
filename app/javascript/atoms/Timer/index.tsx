import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
  ForwardRefRenderFunction,
} from 'react';

export interface TimerHandles {
  start: () => void;
  stop: () => void;
  reset: () => void;
  running: () => boolean;
}

interface Props {
  onChange?: (milliseconds: number) => void;
  onStart?: () => void;
  onStop?: () => void;
}

const Timer: ForwardRefRenderFunction<TimerHandles, Props> = (
  { onChange, onStart, onStop },
  ref
) => {
  const elapsed = useRef<number>(0);

  const startTime = useRef<number>(null);

  const timer = useRef<ReturnType<typeof setTimeout>>();

  const [milliseconds, setMilliseconds] = useState(0);

  const tick = useCallback(() => {
    if (startTime.current) {
      setMilliseconds(elapsed.current + Date.now() - startTime.current);
      timer.current = setTimeout(tick, 100);
    }
  }, []);

  const start = useCallback(() => {
    if (!startTime.current) {
      startTime.current = Date.now();
      if (onStart) onStart();
      tick();
    }
  }, [onStart, tick]);

  const stop = useCallback(() => {
    if (startTime.current) {
      clearTimeout(timer.current);
      elapsed.current = elapsed.current + Date.now() - startTime.current;
      startTime.current = null;
      if (onStop) onStop();
    }
  }, [onStop]);

  const reset = useCallback(() => {
    stop();
    elapsed.current = 0;
    setMilliseconds(0);
  }, [stop]);

  useImperativeHandle(ref, () => ({
    start,
    stop,
    reset,
    running: () => !!startTime.current,
  }));

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    onChange(milliseconds);
  }, [onChange, milliseconds]);

  return null;
};

export default forwardRef(Timer);
