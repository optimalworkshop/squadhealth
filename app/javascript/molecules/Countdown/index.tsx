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
  onComplete?: () => void;
}

const Countdown: ForwardRefRenderFunction<CountdownHandles, Props> = (
  { total = 600, onStart, onStop, onComplete },
  ref
) => {
  const timer = useRef<TimerHandles>();

  const [remaining, setRemaining] = useState<number>(total * 1000);

  const timerChanged = useCallback(
    (value) => setRemaining(Math.max(total * 1000 - value, 0)),
    [total]
  );

  useEffect(() => setRemaining(total * 1000), [total]);

  useImperativeHandle(ref, () => ({
    ...timer.current,
    start: () => {
      if (remaining <= 0) {
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
            Math.floor(
              ((remaining / 1000) % Math.pow(60, n + 1)) / Math.pow(60, n)
            )
          )
          .reverse(),
        (n) => [':', Math.floor(n / 10), n % 10]
      ).slice(1),
    [remaining]
  );

  useEffect(() => {
    if (remaining <= 0) {
      timer.current.stop();
      if (onComplete) onComplete();
    }
  }, [remaining, onComplete]);

  return (
    <div className="countdown">
      <Timer
        ref={timer}
        onChange={timerChanged}
        onStart={onStart}
        onStop={onStop}
      />
      {digits.map((d, i) =>
        d === ':' ? <Separator /> : <Digit key={i} digit={d} />
      )}
    </div>
  );
};

export default forwardRef(Countdown);
