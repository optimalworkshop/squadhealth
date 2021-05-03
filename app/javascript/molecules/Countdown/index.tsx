import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
  ForwardRefRenderFunction,
  useMemo,
} from 'react';
import range from 'lodash/range';
import flatMap from 'lodash/flatMap';
import Timer, { TimerHandles } from '../../atoms/Timer';
import Digit from '../../atoms/Digit';
import Separator from './Separator';

export interface CountdownHandles extends TimerHandles {}

interface Props {
  total?: number;
  onStart?: () => void;
  onStop?: () => void;
  onChange?: (secondsRemaining: number) => void;
  onComplete?: () => void;
}

const Countdown: ForwardRefRenderFunction<CountdownHandles, Props> = (
  { total = 600, onStart, onStop, onChange, onComplete },
  ref
) => {
  const timer = useRef<TimerHandles>();

  const [remaining, setRemaining] = useState<number>(total);

  const timerChanged = useCallback(
    (value) => setRemaining(Math.max(total - Math.floor(value / 1000), 0)),
    [total]
  );

  useEffect(() => setRemaining(total), [total]);

  useImperativeHandle(ref, () => ({
    ...timer.current,
    start: () => {
      if (remaining <= 0) {
        setRemaining(total);
        timer.current.reset();
      }
      timer.current.start();
    },
  }));

  const digits = useMemo(
    () =>
      flatMap(
        range(0, 2)
          .map((n) =>
            Math.floor((remaining % Math.pow(60, n + 1)) / Math.pow(60, n))
          )
          .reverse(),
        (n) => [':', Math.floor(n / 10), n % 10]
      ).slice(1),
    [remaining]
  );

  useEffect(() => {
    if (onChange) {
      onChange(remaining);
    }
    if (remaining <= 0) {
      if (onComplete) onComplete();
      timer.current.stop();
    }
  }, [remaining, onChange, onComplete]);

  return (
    <div className="countdown">
      <Timer
        ref={timer}
        onChange={timerChanged}
        onStart={onStart}
        onStop={onStop}
      />
      {digits.map((d, i) =>
        d === ':' ? <Separator key={i} /> : <Digit key={i} digit={d} />
      )}
    </div>
  );
};

export default forwardRef(Countdown);
