import React from 'react';
import {
  Link,
  useParams,
  useHistory,
  useLocation,
  Switch,
  Route,
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import CloseButton from '../../atoms/CloseButton';
import Join from './Join';

type Mode = 'host' | 'join';

interface Props {}

const Home = (props: Props) => {
  const { mode } = useParams<{ mode: Mode }>();

  const history = useHistory();

  const location = useLocation();

  const back = () => {
    history.push('/');
  };

  return (
    <div className="home page">
      <div className="mode-selector" data-mode={mode || undefined}>
        <div className="mode mode--host">
          <Link to="/host" className="mode__title">
            <b>Host</b> a health check with your squad
          </Link>
        </div>
        <span className="mode-selector__or">
          <b>or</b>
        </span>
        <div className="mode mode--join">
          <Link to="/join" className="mode__title">
            <b>Join</b> a session already in progress
          </Link>
        </div>
      </div>
      <TransitionGroup component={null}>
        <CSSTransition
          appear
          key={mode}
          classNames="mode-content-"
          timeout={1000}
        >
          <Switch location={location}>
            <Route path="/join" component={Join} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      <CloseButton onClick={back} />
    </div>
  );
};

export default Home;
