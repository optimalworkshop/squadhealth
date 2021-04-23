import React from 'react';
import { useParams, Switch, Route } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Room from './Room';

interface Props {}

const Squad = (props: Props) => {
  const { code } = useParams<{ code: string }>();

  return (
    <div className="squad">
      <Switch>
        <Route path="/:code/room" component={Room} />
      </Switch>
    </div>
  );
};

export default Squad;
