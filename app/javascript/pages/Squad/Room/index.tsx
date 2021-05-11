import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useMutation, useQuery, useSubscription } from '@apollo/client';
import get from 'lodash/get';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
import Interface from './Interface';
import { HealthCheck, Squad } from '../../../types';
import FloatyBackground, {
  FloatyBackgroundHandles,
} from '../../../molecules/FloatyBackground';

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

    onlineCount(id: $code)
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

const VOTE_SUBSCRIPTION = gql`
  subscription VoteReceived($squadId: ID!) {
    voteReceived(id: $squadId) {
      value
    }
  }
`;

interface Props {}

interface QueryData {
  squad: Squad;
  onlineCount?: number;
}

interface QueryVariables {
  code: string;
}

const Room: React.FC<Props> = () => {
  const background = useRef<FloatyBackgroundHandles>();

  const { code } = useParams<{ code: string }>();

  const [onlineCount, setOnlineCount] = useState<number>(0);

  const [currentHealthCheck, setCurrentHealthCheck] = useState<HealthCheck>();

  const { data, loading, subscribeToMore } = useQuery<
    QueryData,
    QueryVariables
  >(SQUAD_QUERY, { variables: { code } });

  useEffect(() => {
    subscribeToMore({
      document: SQUAD_SUBSCRIPTION,
      variables: { code },
      updateQuery: (existing, { subscriptionData }) => {
        if (subscriptionData.data) {
          setOnlineCount(
            Math.max(subscriptionData.data['onlineCount'] || 0, 0)
          );
          return { ...existing, ...subscriptionData.data };
        }
        return existing;
      },
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

  useSubscription(VOTE_SUBSCRIPTION, {
    variables: { squadId: code },
    onSubscriptionData: ({ subscriptionData }) => {
      const value = get(subscriptionData, 'data.voteReceived.value');
      if (value && background.current) {
        console.log(value);
        background.current.add(upperFirst(camelCase(value)));
      }
    },
  });

  return (
    <FloatyBackground ref={background}>
      <Interface
        code={code}
        count={onlineCount}
        loading={loading}
        healthCheck={currentHealthCheck}
        onStartSession={start}
        onFinishSession={endSession}
      />
    </FloatyBackground>
  );
};

export default Room;
