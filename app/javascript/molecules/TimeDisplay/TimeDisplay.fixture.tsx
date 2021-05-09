import React from 'react';
import { useValue } from 'react-cosmos/fixture';
import TimeDisplay from './';

const TimeDisplayFixture: React.FC = () => {
  const [seconds, setSeconds] = useValue('seconds', { defaultValue: 83 });
  return <TimeDisplay seconds={seconds} onChange={setSeconds} />;
};

export default TimeDisplayFixture;
