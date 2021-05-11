import React from 'react';
import classNames from 'clsx';
import { Flipper, Flipped } from 'react-flip-toolkit';
import RoomCode from '../../../atoms/RoomCode';
import Throbber from '../../../atoms/Throbber';
import { HealthCheck } from '../../../types';
import Session from './Session';

interface Props {
  code: string;
  count: number;
  loading?: boolean;
  healthCheck?: HealthCheck;
  onStartSession: (seconds: number) => void;
  onFinishSession: () => void;
}

const Interface: React.FC<Props> = ({
  code,
  count = 0,
  loading = false,
  healthCheck,
  onStartSession,
  onFinishSession,
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
      <div className="room__body">
        {
          <Session
            code={code}
            count={count}
            healthCheck={healthCheck}
            onStart={onStartSession}
            onFinish={onFinishSession}
          />
        }
      </div>
    </Flipper>
  );
};

export default Interface;
