import React from 'react';
import { useValue } from 'react-cosmos/fixture';
import Face from './';

export default () => {
  const [value, setValue] = useValue<number>('value', { defaultValue: 0.0 });

  return (
    <>
      <Face value={value} />
      <input
        type="range"
        value={value * 100}
        min={-100}
        max={100}
        onChange={(e) => setValue(parseInt(e.target.value, 10) / 100)}
      />
    </>
  );
};
