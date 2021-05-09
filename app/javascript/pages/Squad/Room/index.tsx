import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useMutation, useQuery } from '@apollo/client';
import Interface from './Interface';
import { HealthCheck, Squad } from '../../../types';

const HEALTH_CHECK_FRAGMENT = gql`
  fragment HealthCheckFields on HealthCheck {
    id
    startedAt
    endedAt
  }
`;

const SQUAD_FRAGMENT = gql`
  fragment SquadFields on Squad {
    id
    currentHealthCheck {
      ...HealthCheckFields
    }
  }

  ${HEALTH_CHECK_FRAGMENT}
`;

const SQUAD_SUBSCRIPTION = gql`
  subscription SquadStatus($code: ID!) {
    squadStatus(id: $code) {
      ...SquadFields
    }
  }

  ${SQUAD_FRAGMENT}
`;

const SQUAD_QUERY = gql`
  query Squad($code: ID!) {
    squad(id: $code) {
      ...SquadFields
    }
  }

  ${SQUAD_FRAGMENT}
`;

const START_SESSION_MUTATION = gql`
  mutation StartSession($code: ID!, $time: Int) {
    startSession(id: $code, time: $time) {
      ...HealthCheckFields
    }
  }

  ${HEALTH_CHECK_FRAGMENT}
`;

const END_SESSION_MUTATION = gql`
  mutation EndSession($code: ID!) {
    endSession(id: $code) {
      ...HealthCheckFields
    }
  }

  ${HEALTH_CHECK_FRAGMENT}
`;

interface Props {}

interface QueryData {
  squad: Squad;
}

interface QueryVariables {
  code: string;
}

const Room: React.FC<Props> = () => {
  const { code } = useParams<{ code: string }>();

  const [currentHealthCheck, setCurrentHealthCheck] = useState<HealthCheck>();

  const { data, loading, subscribeToMore } = useQuery<
    QueryData,
    QueryVariables
  >(SQUAD_QUERY, { variables: { code } });

  useEffect(() => {
    subscribeToMore({
      document: SQUAD_SUBSCRIPTION,
      variables: { code },
    });
  }, [code, subscribeToMore]);

  const [startSession] = useMutation(START_SESSION_MUTATION);

  const start = (time) => {
    startSession({ variables: { code, time } });
  };

  const [endSession] = useMutation(END_SESSION_MUTATION, {
    variables: { code },
  });

  useEffect(() => {
    const check = data?.squad?.currentHealthCheck;
    if (check) setCurrentHealthCheck(check);
  }, [data]);

  return (
    <Interface
      code={code}
      loading={loading}
      healthCheck={currentHealthCheck}
      onStartSession={start}
      onFinishSession={endSession}
    />
  );
};

export default Room;
