import React, { useCallback, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { useValue } from 'react-cosmos/fixture';
import { HealthCheck } from '../../../types';
import Interface from './Interface';

interface FixtureProps {
  loading: boolean;
}

const RoomFixture: React.FC<FixtureProps> = ({ loading }) => {
  const [code] = useValue<string>('code', { defaultValue: 'ABCD' });
  const [count] = useValue<number>('count', { defaultValue: 0 });
  const [healthCheck, setHealthCheck] = useState<HealthCheck>();

  const start = useCallback((seconds: number) => {
    const now = DateTime.now();

    setHealthCheck((current) => ({
      ...current,
      startedAt: now,
      endedAt: now.plus({ seconds }),
    }));
  }, []);

  const finish = useCallback(() => {
    setHealthCheck((current) => ({
      ...current,
      endedAt: DateTime.now(),
    }));
  }, []);

  useEffect(() => {
    if (!loading) {
      setHealthCheck({
        id: code,
        startedAt: null,
        endedAt: null,
      });
    }
  }, [loading, code]);

  return (
    <Interface
      code={code}
      count={count}
      loading={!healthCheck}
      healthCheck={healthCheck}
      onStartSession={start}
      onFinishSession={finish}
    />
  );
};

export default <RoomFixture loading={true} />;
