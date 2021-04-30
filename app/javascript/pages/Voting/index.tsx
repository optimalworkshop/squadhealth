import React, { useEffect, useState } from 'react';
import { gql, useSubscription } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Throbber from '../../atoms/Throbber';

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
      console.log(squad);
      if (squad.currentHealthCheck) {
        setSession(squad.currentHealthCheck);
      }
    }
  }, [squad, error]);

  return (
    <div className="voting">
      {!session && <Throbber style={{ fontSize: '4rem' }} />}
    </div>
  );
};

export default Voting;
