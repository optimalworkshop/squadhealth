import React, { useMemo } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Home from '../pages/Home';
import Squad from '../pages/Squad';

interface Props {}

const Routes: React.FC<Props> = () => {
  const location = useLocation();

  const key = useMemo(() => {
    console.log(location.pathname);
    if (location.pathname.match(/\/(host|join)?$/)) return '/';
    return location.pathname;
  }, [location]);

  return (
    <TransitionGroup component={null}>
      <CSSTransition key={key} timeout={500}>
        <Switch location={location}>
          <Route exact path="/:mode(host|join)?" component={Home} />
          <Route path="/:code([A-Z]{4,})" component={Squad} />
          <Redirect to="/" />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Routes;
