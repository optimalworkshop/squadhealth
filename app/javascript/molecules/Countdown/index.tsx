import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import { DateTime } from 'luxon';
import TimeDisplay from '../TimeDisplay';

interface Props {
  to?: DateTime | string;
  seconds?: number;
  onTick?: (secondsRemaining: number) => void;
  onChange?: (seconds: number) => void;
  onComplete?: () => void;
}

type State = 'ready' | 'running' | 'finished';

const Countdown: React.FC<Props> = ({
  to,
  seconds = 0,
  onTick,
  onChange,
  onComplete,
}) => {
  const [state, setState] = useState<State>('ready');

  const timer = useRef<ReturnType<typeof setInterval>>();

  const endTime = useMemo(
    () =>
      to && (typeof to === 'string' ? DateTime.fromISO(to) : new DateTime(to)),
    [to]
  );

  const [remaining, setRemaining] = useState<number>(() =>
    endTime ? endTime.diff(DateTime.now(), 'seconds').seconds : seconds
  );

  const update = useCallback(() => {
    const { seconds } = endTime.diff(DateTime.now(), 'seconds');
    setRemaining(Math.max(Math.floor(seconds), 0));
  }, [endTime]);

  useEffect(() => {
    if (endTime) {
      timer.current = setInterval(update, 100);
      setState('running');
    } else {
      setState('ready');
    }
    return () => clearInterval(timer.current);
  }, [update, endTime]);

  useEffect(() => {
    if (state === 'running') {
      if (onTick) {
        onTick(remaining);
      }
      if (remaining <= 0) {
        if (onComplete) onComplete();
        setState('finished');
        clearInterval(timer.current);
      }
    }
  }, [state, remaining, onTick, onComplete]);

  useEffect(() => {
    setState((current) => {
      if (endTime) return current;
      if (current !== 'running') setRemaining(seconds);
      return current === 'finished' ? 'ready' : current;
    });
  }, [seconds, endTime]);

  return <TimeDisplay seconds={remaining} onChange={!endTime && onChange} />;
};

export default Countdown;
