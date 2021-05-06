import React, { HTMLAttributes, useCallback } from 'react';
import { useToaster } from '../../molecules/Toaster';

interface Props extends HTMLAttributes<HTMLDivElement> {
  code: string;
}

const RoomCode: React.FC<Props> = ({ code, ...props }) => {
  const { add: toast } = useToaster();

  const copyLink = useCallback(() => {
    const url = `${location.origin}/${code}`;
    navigator.clipboard
      .writeText(url)
      .then(() => toast({ contents: 'Copied to clipboard!' }));
  }, [code, toast]);

  return (
    <div className="room-code" {...props}>
      <div className="room-code__underneath room-code__wrapper">
        <div className="room-code__circle">
          <button type="button" onClick={copyLink}>
            <svg
              className="icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-32 -32 64 64"
            >
              <path fill="none" id="curve" d="M-20 0a20 20 0 0 1 40 0" />
              <text
                textAnchor="middle"
                fill="currentColor"
                style={{
                  fontSize: 8,
                  textAlign: 'center',
                  textTransform: 'uppercase',
                }}
              >
                <textPath xlinkHref="#curve" startOffset="50%">
                  Copy link
                </textPath>
              </text>
              <g
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M-2 1a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M2 -1a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </g>
            </svg>
          </button>
        </div>
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
