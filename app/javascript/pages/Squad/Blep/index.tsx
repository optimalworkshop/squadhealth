import React, { useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Flipper, Flipped } from 'react-flip-toolkit';
import classNames from 'clsx';
import Button from '../../../atoms/Button';
import RoomCode from '../../../atoms/RoomCode';

type Mode = 'entering' | 'waiting' | 'session';

interface Props {}

const Room: React.FC<Props> = () => {
  const { code } = useParams();

  const { origin } = window.location;

  const [mode, setMode] = useState<Mode>('entering');

  useLayoutEffect(() => {
    setMode('waiting');
  }, []);

  return (
    <Flipper
      className={classNames('room', `room--${mode}`)}
      flipKey={mode}
      spring="gentle"
    >
      <div className="room__instructions">
        <Flipped flipId="room__code">
          <div className="room-code-wrapper">
            <RoomCode code={code} />
          </div>
        </Flipped>
        <Flipped flipId="room__link" stagger="instructions">
          <p>
            Go to{' '}
            <a href={origin} target="_blank" rel="noopener noreferrer">
              {origin}
            </a>{' '}
            on your device to join in.
          </p>
        </Flipped>
        <Flipped flipId="room__waiting" stagger="instructions">
          <p className="room__waiting">Waiting for participants…</p>
        </Flipped>
        <Flipped flipId="room__start" stagger="instructions">
          <div>
            <Button
              text="Everyone’s here!"
              onClick={() => setMode('session')}
            />
          </div>
        </Flipped>
        <Flipped flipId="room__start" stagger="instructions">
          <p className="hint">
            Click <kbd>“Everyone’s here!”</kbd> to get started
          </p>
        </Flipped>
      </div>
    </Flipper>
  );
};

export default Room;
