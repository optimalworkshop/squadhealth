import React, { useCallback, useEffect, useRef, useState } from 'react';
import useSound from 'use-sound';
import Button from '../../../atoms/Button';
import Countdown, { CountdownHandles } from '../../../molecules/Countdown';
import { HealthCheck } from '../../../types';
import confetti from '../../../util/confetti';
import tickSound from '../../../sounds/click.mp3';
import completeSound from '../../../sounds/complete2.mp3';

type SessionState = 'waiting' | 'running' | 'paused' | 'finished';

interface Props {
  healthCheck?: HealthCheck;
  onStart?: () => void;
}

const Session: React.FC<Props> = ({ healthCheck, onStart }) => {
  const countdown = useRef<CountdownHandles>();

  const [time, setTime] = useState<number>(600);

  const [state, setState] = useState<SessionState>('waiting');

  const [tick] = useSound(tickSound);
  const [fanfare] = useSound(completeSound);

  // useEffect(() => {
  //   if (healthCheck?.startedAt && state === 'waiting') {
  //     countdown.current.start();
  //   }
  // }, [healthCheck, state]);

  const start = useCallback(() => {
    if (!healthCheck?.startedAt) {
      onStart();
    }
    setState('running');
  }, [onStart]);

  const pause = useCallback(() => {
    setState('paused');
  }, []);

  const finish = useCallback(() => {
    // finish the session
    countdown.current.stop();
    setState('finished');
    setTimeout(() => {
      fanfare();
      confetti();
    }, 150);
  }, [fanfare]);

  const changed = useCallback(
    (remaining) => {
      if (remaining <= 5 && remaining > 0) {
        setTimeout(tick, 150);
      }
    },
    [tick]
  );

  return (
    <div className="session">
      <Countdown
        ref={countdown}
        total={time}
        onTotalChange={state === 'running' ? null : setTime}
        onChange={changed}
        onStart={start}
        onStop={pause}
        onComplete={finish}
      />
      <div className="session__buttons">
        {state === 'waiting' && (
          <Button onClick={countdown.current?.start}>Start</Button>
        )}
        {state === 'paused' && (
          <Button onClick={countdown.current.start}>Continue</Button>
        )}
        {state === 'running' && (
          <Button onClick={countdown.current.stop}>Pause</Button>
        )}
        {(state === 'running' || state === 'paused') && (
          <Button onClick={finish}>Finish</Button>
        )}
      </div>
    </div>
  );
};

export default Session;
