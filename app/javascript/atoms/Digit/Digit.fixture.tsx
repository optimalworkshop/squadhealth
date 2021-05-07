import React, { useEffect, useReducer, useRef, useState } from 'react';
import Digit from './';

const Ticking: React.FC = () => {
  const [d, forward] = useReducer((current) => (current + 1) % 10, 0);

  const timer = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    timer.current = setInterval(forward, 1000);
    return () => clearInterval(timer.current);
  }, [forward]);

  return (
    <div style={{ fontSize: '4rem' }}>
      <Digit digit={d} />
    </div>
  );
};

const Editable: React.FC = () => {
  const [digit, setDigit] = useState(0);

  return (
    <div style={{ fontSize: '4rem' }}>
      <Digit digit={digit} onChange={setDigit} />
    </div>
  );
};

export default {
  Ticking,
  Editable,
};
