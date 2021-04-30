import React, { useCallback, useEffect, useRef, useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Flipped } from 'react-flip-toolkit';
import ButtonInput from '../../molecules/ButtonInput';

const EXISTING_SQUAD_QUERY = gql`
  query ExistingSquad($id: ID!) {
    squad(id: $id) {
      id
    }
  }
`;

interface Props {}

const Join: React.FC<Props> = () => {
  const history = useHistory();

  const [code, setCode] = useState('');

  const codeInput = useRef<HTMLInputElement>();

  const codeChanged = (e) => {
    setCode(e.target.value.toUpperCase().trim().slice(0, 4));
  };

  const completed = (_, { current: { mode } }) => {
    if (mode === 'join') {
      codeInput.current?.focus();
    }
  };

  const [getSquad, { data: existing }] = useLazyQuery(EXISTING_SQUAD_QUERY);

  const findExistingSquad = useCallback(() => {
    getSquad({ variables: { id: code } });
  }, [code]);

  useEffect(() => {
    const { squad } = existing || {};
    if (squad) {
      history.push(`/${squad.id}`);
    }
  }, [existing]);

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
            value={code}
            autoComplete="squad-code"
            onChange={codeChanged}
            onClick={findExistingSquad}
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
