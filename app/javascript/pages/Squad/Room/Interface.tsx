import React from 'react';
import RoomCode from '../../../atoms/RoomCode';
import { HealthCheck } from '../../../types';

interface Props {
  code: string;
  loading: boolean;
  healthCheck?: HealthCheck;
}

const Interface: React.FC<Props> = ({ code, loading, healthCheck }) => {
  console.log(healthCheck);
  return (
    <div className="room">
      <div className="room__header">
        <RoomCode code={code} />
      </div>
      <div className="room__body">
        {!loading &&
          (healthCheck
            ? `Health check started at ${healthCheck.startedAt}`
            : 'New healthcheck')}
      </div>
    </div>
  );
};

export default Interface;
