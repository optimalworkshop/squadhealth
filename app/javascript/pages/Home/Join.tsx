import React, { useState } from 'react';
import ButtonInput from '../../molecules/ButtonInput';

interface Props {}

const Join = (props: Props) => {
  const [joinCode, setJoinCode] = useState('');

  const joinCodeChanged = (e) => {
    setJoinCode(e.target.value.toUpperCase().trim().slice(0, 4));
  };

  return (
    <div className="mode-content mode-content--join">
      <ButtonInput
        placeholder="CODE"
        aria-label="Join code"
        button="Join"
        size={4}
        autoFocus
        value={joinCode}
        onChange={joinCodeChanged}
      />
      <p>Ask your session facilitator for the four-letter room code</p>
    </div>
  );
};

export default Join;
