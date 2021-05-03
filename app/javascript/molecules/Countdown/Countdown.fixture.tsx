import React, { useRef, useState } from 'react';
import Countdown, { CountdownHandles } from './';
import Button from '../../atoms/Button';

const CountdownFixture: React.FC = () => {
  const ref = useRef<CountdownHandles>();

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

  return (
    <>
      <Countdown
        ref={ref}
        onStart={() => setRunning(true)}
        onStop={() => setRunning(false)}
      />
      {running ? (
        <Button text="Stop" onClick={stop} />
      ) : (
        <Button text="Start" onClick={start} />
      )}
      <Button text="Reset" onClick={reset} />
    </>
  );
};

export default CountdownFixture;
