import React, { useRef, useState } from 'react';
import { Flipped } from 'react-flip-toolkit';
import ButtonInput from '../../molecules/ButtonInput';

interface Props {}

const Join = (props: Props) => {
  const [joinCode, setJoinCode] = useState('');

  const codeInput = useRef<HTMLInputElement>();

  const joinCodeChanged = (e) => {
    setJoinCode(e.target.value.toUpperCase().trim().slice(0, 4));
  };

  const completed = (_, { current: { mode } }) => {
    if (mode === 'join') {
      codeInput.current?.focus();
    }
  };

  return (
    <div className="mode-content mode-content--join">
      <Flipped flipId="join__code" stagger="children" onComplete={completed}>
        <div>
          <ButtonInput
            ref={codeInput}
            placeholder="CODE"
            aria-label="Join code"
            button="Join"
            size={8}
            value={joinCode}
            onChange={joinCodeChanged}
          />
        </div>
      </Flipped>
      <Flipped flipId="join__p1" stagger="children">
        <p>Ask your session facilitator for the four-letter room code</p>
      </Flipped>
    </div>
  );
};

export default Join;
