import React, { useCallback, useState } from 'react';
import { DateTime } from 'luxon';
import { useValue } from 'react-cosmos/fixture';
import useSound from 'use-sound';
import Countdown from './';
import confetti from '../../util/confetti';
import TICK_SOUND from '../../sounds/click.mp3';
import COMPLETE_SOUND from '../../sounds/complete2.mp3';
import Button from '../../atoms/Button';

const CountdownFixture: React.FC = () => {
  const [endTime, setEndTime] = useState<DateTime>();

  const [duration, setDuration] = useValue<number>('duration', {
    defaultValue: 60,
  });

  const start = () => {
    setEndTime(DateTime.now().plus({ seconds: duration }));
  };

  const stop = () => {
    setEndTime(null);
  };

  const [playTick] = useSound(TICK_SOUND);
  const [playFanfare] = useSound(COMPLETE_SOUND);

  const tick = useCallback(
    (remaining) => {
      if (remaining <= 5 && remaining > 0) {
        setTimeout(playTick, 150);
      }
    },
    [playTick]
  );

  const completed = useCallback(() => {
    setTimeout(() => {
      confetti();
      playFanfare();
    }, 150);
    setEndTime(null);
  }, [playFanfare]);

  return (
    <>
      <Countdown
        seconds={duration}
        to={endTime}
        onChange={setDuration}
        onComplete={completed}
        onTick={tick}
      />
      {endTime ? (
        <Button onClick={stop}>Stop</Button>
      ) : (
        <Button onClick={start}>Start</Button>
      )}
    </>
  );
};

export default <CountdownFixture />;
