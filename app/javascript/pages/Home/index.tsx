import React, { useEffect, useRef } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { Link, useParams, useHistory } from 'react-router-dom';
import CloseButton from '../../atoms/CloseButton';
import HostOptions from './Host';
import JoinOptions from './Join';

function usePrevious<T>(value: T): T {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

type Mode = 'host' | 'join';

interface Props {}

const Home: React.FC<Props> = () => {
  const { mode } = useParams<{ mode: Mode }>();

  const modeWas = usePrevious(mode);

  const reverse = mode === 'host' || (!mode && modeWas === 'join');

  const history = useHistory();

  const back = () => {
    history.push('/');
  };

  return (
    <Flipper
      className="home page"
      flipKey={mode || 'default'}
      spring="gentle"
      staggerConfig={{ default: { reverse }, children: { reverse: !mode } }}
      decisionData={{ mode }}
    >
      <div className="mode-selector" data-mode={mode || undefined}>
        <Flipped flipId="mode--host" stagger>
          <div
            className="mode mode--host"
            aria-selected={mode === 'host' || undefined}
          >
            <Link to="/host" className="mode__title">
              <b>Host</b> a health check with your squad
            </Link>
          </div>
        </Flipped>
        <span className="mode-selector__or">
          <b>or</b>
        </span>
        <Flipped flipId="mode--join" stagger>
          <div
            className="mode mode--join"
            aria-selected={mode === 'join' || undefined}
          >
            <Link to="/join" className="mode__title">
              <b>Join</b> a session already in progress
            </Link>
          </div>
        </Flipped>
      </div>
      <HostOptions />
      <JoinOptions />
      <CloseButton onClick={back} />
    </Flipper>
  );
};

export default Home;
