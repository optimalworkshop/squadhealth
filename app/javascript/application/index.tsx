import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';

interface Props {}

const App = (props: Props) => {
  return (
    <Router>
      <Route path="/:mode(host|join)?" component={Home} />
    </Router>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  const container = document.createElement('div');
  container.classList.add('application');
  render(<App />, document.body.appendChild(container));
});
