import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Provider from '../graphql/Provider';
import IdentityProvider from '../util/IdentityProvider';
import ToasterProvider from '../molecules/Toaster';
import Routes from './Routes';

interface Props {}

const App: React.FC<Props> = () => (
  <Provider>
    <IdentityProvider>
      <ToasterProvider>
        <Router>
          <Routes />
        </Router>
      </ToasterProvider>
    </IdentityProvider>
  </Provider>
);

document.addEventListener('DOMContentLoaded', () => {
  const container = document.createElement('div');
  container.classList.add('application');
  render(<App />, document.body.appendChild(container));
});
