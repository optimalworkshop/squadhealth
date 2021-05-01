import React, { useCallback, useEffect, useState } from 'react';
import { gql, useSubscription, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Interface from './Interface';

const SQUAD_SUBSCRIPTION = gql`
  subscription SquadStatus($code: ID!) {
    squadStatus(id: $code) {
      currentHealthCheck {
        id
        values {
          id
          name
          good
          bad
        }
      }
    }
  }
`;

const VOTE_MUTATION = gql`
  mutation RecordVote($code: ID!, $value: String!, $score: Int!) {
    recordVote(squadId: $code, value: $value, score: $score)
  }
`;

interface Props {}

const Voting: React.FC<Props> = () => {
  const { code } = useParams<{ code: string }>();

  const [session, setSession] = useState(null);

  const {
    data: { squadStatus: squad } = {},
    error,
  } = useSubscription(SQUAD_SUBSCRIPTION, { variables: { code } });

  useEffect(() => {
    if (error) {
      // do something about it
      console.log(error);
    } else if (squad) {
      if (squad.currentHealthCheck) {
        setSession(squad.currentHealthCheck);
      }
    }
  }, [squad, error]);

  const [recordVote] = useMutation(VOTE_MUTATION);

  const vote = useCallback(
    (value, score) => {
      recordVote({
        variables: { code, value, score },
        optimisticResponse: { recordVote: { recordVote: true } },
      });
    },
    [code]
  );

  return <Interface session={session} onVote={vote} />;
};

export default Voting;
