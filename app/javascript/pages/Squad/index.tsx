import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Room from './Room';
import Voting from '../Voting';

interface Props {}

const Squad: React.FC<Props> = () => (
  <div className="squad">
    <Switch>
      <Route path="/:code/room" component={Room} />
      <Route exact path="/:code" component={Voting} />
    </Switch>
  </div>
);

export default Squad;
