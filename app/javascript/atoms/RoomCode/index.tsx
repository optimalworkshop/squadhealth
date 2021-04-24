import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  code: string;
}

const RoomCode = ({ code, children, ...props }: Props) => {
  return (
    <div className="room-code" {...props}>
      <div className="room-code__underneath room-code__wrapper">
        <div className="room-code__circle">{children}</div>
      </div>

      <div className="room-code__sticky">
        <div className="room-code__front room-code__wrapper">
          <div className="room-code__circle">
            <h4 className="room-code__code">{code}</h4>
          </div>
        </div>
      </div>

      <div className="room-code__sticky">
        <div className="room-code__back room-code__wrapper">
          <div className="room-code__circle"></div>
        </div>
      </div>
    </div>
  );
};

export default RoomCode;
