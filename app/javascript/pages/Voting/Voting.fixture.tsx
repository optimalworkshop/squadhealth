import React, { useMemo } from 'react';
import { useValue } from 'react-cosmos/fixture';
import { DateTime } from 'luxon';
import Interface from './Interface';
import VALUES from '../../constants/values';

const values = Object.values(VALUES).slice(0, 3);

const VotingFixture: React.FC = () => {
  const [ready] = useValue('ready', { defaultValue: false });

  const now = useMemo(() => DateTime.now(), []);

  return (
    <Interface
      healthCheck={
        ready ? { id: 'id', values, startedAt: now, endedAt: null } : null
      }
    />
  );
};

export default VotingFixture;
