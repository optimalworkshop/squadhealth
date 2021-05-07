import React, { useCallback, useRef, useState } from 'react';
import { useValue } from 'react-cosmos/fixture';
import useSound from 'use-sound';
import Countdown, { CountdownHandles } from './';
import Button from '../../atoms/Button';
import confetti from '../../util/confetti';
import tickSound from '../../sounds/click.mp3';
import completeSound from '../../sounds/complete2.mp3';

const CountdownFixture: React.FC = () => {
  const ref = useRef<CountdownHandles>();

  const [max, setMax] = useValue<number>('max', { defaultValue: 60 });

  const [running, setRunning] = useState<boolean>(false);

  const start = () => {
    ref.current?.start();
  };

  const stop = () => {
    ref.current?.stop();
  };

  const reset = () => {
    ref.current?.reset();
  };

  const [tick] = useSound(tickSound);
  const [fanfare] = useSound(completeSound);

  const changed = useCallback(
    (remaining) => {
      if (running && remaining <= 5) {
        setTimeout(tick, 300);
      }
    },
    [tick, running]
  );

  const completed = useCallback(() => {
    if (running) {
      setTimeout(() => {
        confetti();
        fanfare();
      }, 300);
    }
  }, [fanfare, running]);

  return (
    <>
      <Countdown
        ref={ref}
        total={max}
        onStart={() => setRunning(true)}
        onStop={() => setRunning(false)}
        onComplete={completed}
        onChange={changed}
        onTotalChange={setMax}
      />
      {running ? (
        <Button onClick={stop}>Stop</Button>
      ) : (
        <Button onClick={start}>Start</Button>
      )}
      <Button onClick={reset}>Reset</Button>
    </>
  );
};

export default <CountdownFixture />;
