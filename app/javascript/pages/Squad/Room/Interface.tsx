import React from 'react';
import classNames from 'clsx';
import { Flipper, Flipped } from 'react-flip-toolkit';
import RoomCode from '../../../atoms/RoomCode';
import Throbber from '../../../atoms/Throbber';
import { HealthCheck } from '../../../types';
import Session from './Session';

interface Props {
  code: string;
  loading?: boolean;
  healthCheck?: HealthCheck;
  onStartSession?: () => void;
}

const Interface: React.FC<Props> = ({
  code,
  loading = false,
  healthCheck,
  onStartSession,
}) => {
  return (
    <Flipper
      className={classNames('room', loading && 'room--loading')}
      spring="gentle"
      flipKey={loading ? 'loading' : 'loaded'}
    >
      <div className="room__header">
        <RoomCode code={code} />
      </div>
      <Flipped flipId="room__loading">
        <Throbber className="room__loading" />
      </Flipped>
      <Flipped flipId="room__body">
        <div className="room__body">
          {<Session healthCheck={healthCheck} onStart={onStartSession} />}
        </div>
      </Flipped>
    </Flipper>
  );
};

export default Interface;
