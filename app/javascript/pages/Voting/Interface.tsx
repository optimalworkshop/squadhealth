import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'clsx';
import chroma from 'chroma-js';
import shuffle from 'lodash/shuffle';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { useSpring, animated } from 'react-spring';
import Throbber from '../../atoms/Throbber';
import { Value } from '../../constants/values';
import CardStack from '../../molecules/CardStack';
import COLORS from '../../styles/colors.module.scss';

const backgroundColor = chroma
  .scale([COLORS.rose300, COLORS.blueGrey50, COLORS.green300])
  .domain([-1, 1]);

export interface VotingSession {
  id: string;
  values: Value[];
}

interface Props {
  session?: VotingSession;
}

const Interface: React.FC<Props> = ({ session }) => {
  const state = session ? 'voting' : 'waiting';

  const [{ background }, setBackground] = useSpring(() => ({ background: 0 }));

  const [sorted, setSorted] = useState<Set<Value>>(new Set());

  useEffect(() => {
    setBackground({ background: 0 });
  }, [state]);

  useEffect(() => {
    setSorted(new Set<Value>());
  }, [session]);

  const cards = useMemo(() => {
    if (!session) return [];
    return shuffle(session.values);
  }, [session]);

  const dragging = useCallback(
    (position) => setBackground({ background: position }),
    []
  );

  const cardSorted = useCallback((card: Value, _score: number) => {
    setSorted((current) => new Set(current).add(card));
  }, []);

  return (
    <Flipper
      className={classNames('voting', `voting--${state}`)}
      flipKey={state}
      spring="gentle"
      staggerConfig={{
        waiting: {
          reverse: state === 'waiting',
        },
        voting: {
          reverse: state !== 'voting',
        },
      }}
    >
      <div className="voting__waiting">
        <Flipped flipId="waiting__throbber" stagger="waiting">
          <Throbber />
        </Flipped>
        <Flipped flipId="waiting__p" stagger="waiting">
          <p>Waiting for a facilitator to start a voting session…</p>
        </Flipped>
      </div>
      <animated.div
        className="voting__voting"
        style={{
          backgroundColor: background.to((p) => backgroundColor(p)),
        }}
      >
        <Flipped flipId="voting__cards" stagger="voting">
          {(flippedProps) => (
            <CardStack
              cards={cards}
              onDragging={dragging}
              onSort={cardSorted}
              {...flippedProps}
            />
          )}
        </Flipped>
        <Flipped flipId="voting__status" stagger="voting">
          <p className="voting__status">
            {sorted.size < cards.length ? (
              <>
                Card <b>#{sorted.size + 1}</b> of {cards.length}
              </>
            ) : (
              <>Finished!</>
            )}
          </p>
        </Flipped>
      </animated.div>
    </Flipper>
  );
};

export default Interface;
