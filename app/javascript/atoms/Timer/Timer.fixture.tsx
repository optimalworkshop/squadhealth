import React, { useRef, useState } from 'react';
import Timer, { TimerHandles } from './';
import Button from '../Button';

const TimerFixture: React.FC = () => {
  const ref = useRef<TimerHandles>();

  const [running, setRunning] = useState<boolean>(false);

  const [milliseconds, setMilliseconds] = useState<number>(0);

  const start = () => {
    if (ref.current) {
      ref.current.start();
    }
  };

  const stop = () => {
    if (ref.current) {
      ref.current.stop();
    }
  };

  const reset = () => {
    if (ref.current) {
      ref.current.reset();
    }
  };

  return (
    <>
      <Timer
        ref={ref}
        onChange={setMilliseconds}
        onStart={() => setRunning(true)}
        onStop={() => setRunning(false)}
      />
      {milliseconds}
      {running ? (
        <Button onClick={stop}>Stop</Button>
      ) : (
        <Button onClick={start}>Start</Button>
      )}
      <Button onClick={reset}>Reset</Button>
    </>
  );
};

export default TimerFixture;
