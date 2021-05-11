import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Provider from '../graphql/Provider';
import Home from '../pages/Home';
import Squad from '../pages/Squad';
import IdentityProvider from '../util/IdentityProvider';
import ToasterProvider from '../molecules/Toaster';

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <Provider>
      <IdentityProvider>
        <ToasterProvider>
          <Router>
            <Switch>
              <Route exact path="/:mode(host|join)?" component={Home} />
              <Route path="/:code([A-Z]{4,})" component={Squad} />
              <Redirect to="/" />
            </Switch>
          </Router>
        </ToasterProvider>
      </IdentityProvider>
    </Provider>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  const container = document.createElement('div');
  container.classList.add('application');
  render(<App />, document.body.appendChild(container));
});
