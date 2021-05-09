import React, { useCallback, useEffect } from 'react';
import { gql, useSubscription, useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Interface from './Interface';
import { useIdentity } from '../../util/IdentityProvider';
import { Squad } from '../../types';

const SQUAD_SUBSCRIPTION = gql`
  subscription SquadStatus($code: ID!) {
    squadStatus(id: $code) {
      currentHealthCheck {
        id
      }
    }
  }
`;

const SQUAD_QUERY = gql`
  query Squad($code: ID!, $identity: ID!) {
    squad(id: $code) {
      currentHealthCheck {
        id
        startedAt
        endedAt

        values {
          id
          name
          good
          bad
        }

        votes(for: $identity) {
          value
          score
        }
      }
    }
  }
`;

const VOTE_MUTATION = gql`
  mutation RecordVote($code: ID!, $value: String!, $score: Int!) {
    recordVote(squadId: $code, value: $value, score: $score) {
      value
      score
    }
  }
`;

interface QueryType {
  squad: Squad;
}

interface QueryParams {
  code: string;
  identity: string;
}

interface Props {}

const Voting: React.FC<Props> = () => {
  const { code } = useParams<{ code: string }>();

  const identity = useIdentity();

  const {
    data: { squad: { currentHealthCheck: healthCheck } = {} } = {},
    refetch,
  } = useQuery<QueryType, QueryParams>(SQUAD_QUERY, {
    variables: { code, identity: identity.id },
  });

  const { data: { squadStatus } = {} } = useSubscription(SQUAD_SUBSCRIPTION, {
    variables: { code },
  });

  useEffect(() => {
    if (squadStatus?.currentHealthCheck?.id !== healthCheck?.id) {
      refetch();
    }
  }, [squadStatus, healthCheck, refetch]);

  const [recordVote] = useMutation(VOTE_MUTATION);

  const vote = useCallback(
    (value, score) => {
      recordVote({
        variables: { code, value, score },
        optimisticResponse: { recordVote: { recordVote: true } },
      });
    },
    [code, recordVote]
  );

  return <Interface healthCheck={healthCheck} onVote={vote} />;
};

export default Voting;
