import React, { useCallback, useEffect, useState } from 'react';
import useSound from 'use-sound';
import Button from '../../../atoms/Button';
import Countdown from '../../../molecules/Countdown';
import { HealthCheck } from '../../../types';
import confetti from '../../../util/confetti';
import tickSound from '../../../sounds/click.mp3';
import completeSound from '../../../sounds/complete2.mp3';

type SessionState = 'waiting' | 'running' | 'finished';

interface Props {
  healthCheck?: HealthCheck;
  onStart: (seconds: number) => void;
  onFinish: () => void;
}

const Session: React.FC<Props> = ({ healthCheck, onStart, onFinish }) => {
  const [time, setTime] = useState<number>(600);

  const [state, setState] = useState<SessionState>('waiting');

  const [playTick] = useSound(tickSound);
  const [playFanfare] = useSound(completeSound);

  useEffect(() => {
    if (healthCheck?.startedAt) {
      setState((current) => (current === 'waiting' ? 'running' : current));
    }
  }, [healthCheck]);

  const start = useCallback(() => {
    if (!healthCheck?.startedAt) {
      onStart(time);
    }
    setState('running');
  }, [healthCheck, onStart, time]);

  const completed = useCallback(() => {
    setState('finished');
    setTimeout(() => {
      playFanfare();
      confetti();
    }, 150);
  }, [playFanfare]);

  const finish = useCallback(() => {
    setState('finished');
    onFinish();
  }, [onFinish]);

  const tick = useCallback(
    (remaining) => {
      if (remaining <= 5 && remaining > 0) {
        setTimeout(playTick, 150);
      }
    },
    [playTick]
  );

  return (
    <div className="session">
      <Countdown
        to={healthCheck?.endedAt}
        seconds={time}
        onChange={state === 'running' ? null : setTime}
        onTick={tick}
        onComplete={completed}
      />
      <div className="session__buttons">
        {state === 'waiting' && <Button onClick={start}>Start</Button>}
        {state === 'running' && <Button onClick={finish}>Finish</Button>}
      </div>
    </div>
  );
};

export default Session;
