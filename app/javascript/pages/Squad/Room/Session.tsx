import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useSound from 'use-sound';
import { Flipped } from 'react-flip-toolkit';
import Button from '../../../atoms/Button';
import Countdown from '../../../molecules/Countdown';
import { HealthCheck } from '../../../types';
import confetti from '../../../util/confetti';
import tickSound from '../../../sounds/click.mp3';
import completeSound from '../../../sounds/complete2.mp3';

enum SessionState {
  WAITING = 'waiting',
  RUNNING = 'running',
  FINISHED = 'finished',
}

const HEADINGS: { [key in SessionState]: string } = {
  waiting: 'Waiting for participants…',
  running: 'Cast your votes now!',
  finished: 'Time’s up!',
};

interface Props {
  code: string;
  count: number;
  healthCheck?: HealthCheck;
  onStart: (seconds: number) => void;
  onFinish: () => void;
}

const Session: React.FC<Props> = ({
  code,
  count = 0,
  healthCheck,
  onStart,
  onFinish,
}) => {
  const [time, setTime] = useState<number>(600);

  const [state, setState] = useState<SessionState>(SessionState.WAITING);

  const [playTick] = useSound(tickSound);
  const [playFanfare] = useSound(completeSound);

  useEffect(() => {
    if (healthCheck?.startedAt) {
      setState((current) =>
        current === SessionState.WAITING ? SessionState.RUNNING : current
      );
    }
  }, [healthCheck]);

  const start = useCallback(() => {
    if (!healthCheck?.startedAt) {
      onStart(time);
    }
    setState(SessionState.RUNNING);
  }, [healthCheck, onStart, time]);

  const completed = useCallback(() => {
    setState(SessionState.FINISHED);
    setTimeout(() => {
      playFanfare();
      confetti();
    }, 150);
  }, [playFanfare]);

  const finish = useCallback(() => {
    setState(SessionState.FINISHED);
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

  const url = useMemo(() => `${location.origin}/${code}`, [code]);

  const heading = useMemo(() => {
    if (state === SessionState.FINISHED || !count) {
      return HEADINGS[state];
    }

    return count > 1
      ? `There are ${count} people here.`
      : 'There is 1 person here';
  }, [state, count]);

  return (
    <div className="session">
      <div>
        <Flipped flipId="session__heading" stagger="session">
          <h3>{heading}</h3>
        </Flipped>
        <Flipped flipId="session__countdown" stagger="session">
          <div className="session__countdown">
            <Countdown
              to={healthCheck?.endedAt}
              seconds={time}
              onChange={state === SessionState.RUNNING ? null : setTime}
              onTick={tick}
              onComplete={completed}
            />
          </div>
        </Flipped>
        <Flipped flipId="session__instructions" stagger="session">
          <p>
            Join in at{' '}
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </a>
          </p>
        </Flipped>
      </div>
      <Flipped flipId="session__buttons" stagger="session">
        <div className="session__buttons">
          {state === SessionState.WAITING ? (
            <Button onClick={start}>Start</Button>
          ) : (
            <Button onClick={finish} disabled={state !== 'running'}>
              Finish
            </Button>
          )}
        </div>
      </Flipped>
    </div>
  );
};

export default Session;
