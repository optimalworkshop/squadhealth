import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'clsx';
import chroma from 'chroma-js';
import shuffle from 'lodash/shuffle';
import sample from 'lodash/sample';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { useSpring, animated } from 'react-spring';
import Throbber from '../../atoms/Throbber';
import { Value, HealthCheck } from '../../types';
import CardStack from '../../molecules/CardStack';
import COLORS from '../../styles/colors.module.scss';
import NEXT_STEPS from './nextSteps';
import Face from '../../atoms/Face';
import confetti from '../../util/confetti';

const backgroundColor = chroma
  .scale([COLORS.rose300, COLORS.blueGrey50, COLORS.green300])
  .domain([-1, 1]);

type State = 'waiting' | 'voting' | 'finished';

interface Props {
  healthCheck?: HealthCheck;
  onVote?: (value: string, score: number) => void;
}

const Interface: React.FC<Props> = ({ healthCheck, onVote }) => {
  const [state, setState] = useState<State>('waiting');

  const [{ background }, setBackground] = useSpring(() => ({ background: 0 }));

  const [sorted, setSorted] = useState<Set<string>>(new Set());

  const nextStep = useMemo(() => sample(NEXT_STEPS), []);

  useEffect(() => {
    setBackground({ background: 0 });
  }, [state, setBackground]);

  useEffect(() => {
    if (healthCheck?.votes) {
      setSorted(new Set<string>(healthCheck.votes.map(({ value }) => value)));
    }

    setState((current) => {
      switch (current) {
        case 'waiting':
          return healthCheck ? 'voting' : current;
        case 'voting':
          setSorted(new Set<string>());
          return healthCheck ? current : 'waiting';
        default:
          return current;
      }
    });
  }, [healthCheck]);

  const cards = useMemo(
    () => (healthCheck ? shuffle(healthCheck.values) : []),
    [healthCheck]
  );

  const dragging = useCallback(
    (position) => setBackground({ background: position }),
    [setBackground]
  );

  const cardSorted = useCallback(
    (card: Value, score: number) => {
      setSorted((current) => new Set(current).add(card.id));
      if (onVote) onVote(card.id, score);
    },
    [onVote]
  );

  useEffect(() => {
    if (
      state === 'voting' &&
      cards.length &&
      cards.every((card) => sorted.has(card.id))
    ) {
      setState('finished');
      confetti();
    }
  }, [cards, sorted, state]);

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
        finished: {
          reverse: state === 'finished',
        },
      }}
    >
      <div className="voting__waiting">
        <Flipped flipId="waiting__throbber" stagger="waiting">
          <Throbber />
        </Flipped>
        <Flipped flipId="waiting__p" stagger="waiting">
          <p>Waiting for a facilitator to start a voting healthCheck…</p>
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
              sorted={sorted}
              onDragging={dragging}
              onSort={cardSorted}
              {...flippedProps}
            />
          )}
        </Flipped>
        <Flipped flipId="voting__status" stagger="voting">
          <p className="voting__status">
            Card <b>#{Math.min(sorted.size + 1, cards.length)}</b> of{' '}
            {cards.length}
          </p>
        </Flipped>
      </animated.div>
      <div className="voting__finished">
        <Flipped flipId="voting__face" stagger="finished">
          <Face value={1} />
        </Flipped>
        <Flipped flipId="voting__done" stagger="finished">
          <h3>You’re all done!</h3>
        </Flipped>
        <Flipped flipId="voting__next" stagger="finished">
          <p className="voting__next">{nextStep}</p>
        </Flipped>
      </div>
    </Flipper>
  );
};

export default Interface;
