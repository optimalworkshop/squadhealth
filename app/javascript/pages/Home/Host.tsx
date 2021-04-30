import React, { useCallback, useEffect, useRef, useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import Button from '../../atoms/Button';
import ButtonInput from '../../molecules/ButtonInput';
import { Flipped } from 'react-flip-toolkit';

const EXISTING_SQUAD_QUERY = gql`
  query ExistingSquad($id: ID!) {
    squad(id: $id) {
      id
    }
  }
`;

interface Props {}

const Host: React.FC<Props> = () => {
  const [code, setCode] = useState('');

  const history = useHistory();

  const codeChanged = (e) => {
    setCode(e.target.value.toUpperCase().trim().slice(0, 4));
  };

  const codeInput = useRef<HTMLInputElement>();

  const completed = (_, { current: { mode } }) => {
    if (mode === 'host') {
      codeInput.current?.focus();
    }
  };

  const [
    getSquad,
    { data: existing, error: existingSquadError },
  ] = useLazyQuery(EXISTING_SQUAD_QUERY);

  const findExistingSquad = useCallback(() => {
    getSquad({ variables: { id: code } });
  }, [code]);

  useEffect(() => {
    const { squad } = existing || {};
    if (squad) {
      history.push(`/${squad.id}/room`);
    }
  }, [existing]);

  return (
    <div className="mode-content mode-content--host">
      <Flipped flipId="host__p1" stagger="children">
        <p>Pick up where you left off…</p>
      </Flipped>
      <Flipped flipId="host__code" stagger="children" onComplete={completed}>
        <div>
          <ButtonInput
            ref={codeInput}
            placeholder="CODE"
            aria-label="Room code"
            button="Start"
            size={8}
            value={code}
            autoComplete="squad-code"
            disabled={!code || undefined}
            onChange={codeChanged}
            onClick={findExistingSquad}
          />
        </div>
      </Flipped>
      {existingSquadError && (
        <Flipped flipId="host__error" stagger="children">
          <p className="error-message">
            Sorry, we couldn’t find that squad. Please try again.
          </p>
        </Flipped>
      )}
      <Flipped flipId="host__p2" stagger="children">
        <p>…or get started with a new squad!</p>
      </Flipped>
      <Flipped flipId="host__create" stagger="children">
        <Button text="Create squad" />
      </Flipped>
    </div>
  );
};

export default Host;
