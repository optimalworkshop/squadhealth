import React, { Fragment, useMemo } from 'react';
import range from 'lodash/range';
import flatMap from 'lodash/flatMap';
import Digit from '../../atoms/Digit';
import Separator from './Separator';

interface Props {
  seconds: number;
  onChange?: (number) => void;
}

const TimeDisplay: React.FC<Props> = ({ seconds, onChange }) => {
  const digits = useMemo(
    () =>
      flatMap(
        range(0, 2)
          .map((n) =>
            Math.floor((seconds % Math.pow(60, n + 1)) / Math.pow(60, n))
          )
          .reverse(),
        (n) => [Math.floor(n / 10), n % 10]
      ).reverse(),
    [seconds]
  );

  const digitChanged = (place) => {
    if (!onChange) return null;

    const a = Math.pow(60, Math.floor(place / 2));
    const b = Math.pow(10, place % 2);

    return (value) => {
      const v = seconds - (Math.floor(((seconds / a) % 60) / b) % 10) * a * b;
      onChange(v + value * a * b);
    };
  };

  return (
    <div className="countdown">
      {digits.map((d, i) => (
        <Fragment key={i}>
          <Digit digit={d} onChange={digitChanged(i)} max={i % 2 ? 6 : 10} />
          {i === 1 && <Separator />}
        </Fragment>
      ))}
    </div>
  );
};

export default TimeDisplay;
