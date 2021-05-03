import React from 'react';
import { useParams } from 'react-router-dom';
import { gql, useSubscription } from '@apollo/client';
import Interface from './Interface';

const SQUAD_SUBSCRIPTION = gql`
  subscription SquadStatus($code: ID!) {
    squadStatus(id: $code) {
      currentHealthCheck {
        id
        startedAt
      }
    }
  }
`;

interface Props {}

const Room: React.FC<Props> = () => {
  const { code } = useParams();

  const {
    loading,
    data: { squadStatus: { currentHealthCheck = null } = {} } = {},
  } = useSubscription(SQUAD_SUBSCRIPTION, {
    variables: { code },
  });

  return (
    <Interface code={code} loading={loading} healthCheck={currentHealthCheck} />
  );
};

export default Room;
