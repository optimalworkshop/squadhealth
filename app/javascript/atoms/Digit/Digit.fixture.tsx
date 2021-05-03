import React, { useEffect, useReducer, useRef } from 'react';
import Digit from './';

const DigitFixture: React.FC = () => {
  const [d, forward] = useReducer((current) => (current + 1) % 10, 0);

  const timer = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    timer.current = setInterval(forward, 1000);
    return () => clearInterval(timer.current);
  }, [forward]);

  return <Digit digit={d} />;
};

export default DigitFixture;
