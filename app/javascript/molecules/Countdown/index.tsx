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
  onTotalChange?: (seconds: number) => void;
  onComplete?: () => void;
}

const Countdown: ForwardRefRenderFunction<CountdownHandles, Props> = (
  { total = 600, onStart, onStop, onChange, onTotalChange, onComplete },
  ref
) => {
  const timer = useRef<TimerHandles>();

  const [remaining, setRemaining] = useState<number>(total);

  const [running, setRunning] = useState<boolean>(false);

  const started = () => {
    setRunning(true);
    if (onStart) onStart();
  };

  const stopped = () => {
    setRunning(false);
    if (onStop) onStop();
  };

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

  const digitChanged = (place) => {
    if (running) return null;

    return (mutate) => {
      const newDigits = digits.slice(0);
      const newValue = mutate(digits[place]);
      newDigits.splice(place, 1, newValue);
      const newRemaining =
        newDigits[0] * 600 +
        newDigits[1] * 60 +
        newDigits[3] * 10 +
        newDigits[4];
      setRemaining(newRemaining);
      timer.current.reset();
      if (onTotalChange) onTotalChange(newRemaining);
    };
  };

  return (
    <div className="countdown">
      <Timer
        ref={timer}
        onChange={timerChanged}
        onStart={started}
        onStop={stopped}
      />
      {digits.map((d, i) =>
        d === ':' ? (
          <Separator key={i} />
        ) : (
          <Digit
            key={i}
            digit={d}
            onChange={digitChanged(i)}
            max={i % 3 ? 10 : 6}
          />
        )
      )}
    </div>
  );
};

export default forwardRef(Countdown);
