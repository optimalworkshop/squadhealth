import React from 'react';
import { useValue } from 'react-cosmos/fixture';
import Interface from './Interface';
import VALUES from '../../constants/values';

const values = Object.values(VALUES).slice(0, 3);

const VotingFixture: React.FC = () => {
  const [ready] = useValue('ready', { defaultValue: false });

  return <Interface healthCheck={ready ? { id: 'id', values } : null} />;
};

export default VotingFixture;
