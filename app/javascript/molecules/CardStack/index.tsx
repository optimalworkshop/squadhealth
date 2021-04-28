import React, { useMemo, useRef } from 'react';
import { useSpring, useSprings, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import upperFirst from 'lodash/upperFirst';
import chroma from 'chroma-js';
import Card from '../Card';
import VALUES, { Value } from '../../constants/values';
import COLORS from '../../styles/colors.module.scss';

const backgroundColor = chroma
  .scale([COLORS.rose300, COLORS.blueGrey50, COLORS.green300])
  .domain([-1, 1]);

const MAX_ROTATION = 15;

interface Props {
  cards?: Value[];
}

const CardStack: React.FC<Props> = ({
  cards: deck = Object.values(VALUES),
}) => {
  const container = useRef<HTMLDivElement>();

  const cards = useMemo(() => deck.slice().reverse(), [deck]);

  const [{ background }, setBackground] = useSpring(() => ({ background: 0 }));

  const [stack, set] = useSprings(cards.length, (i) => ({
    x: 0,
    y: 0,
    rotate: 0,
    opacity: i >= cards.length - 2 ? 1 : 0,
    scale: i === cards.length - 1 ? 1 : 0.9,
  }));

  const sorted = useRef<Set<string>>(new Set());

  const bind = useDrag(
    ({
      args: [index],
      down,
      movement: [dx, dy],
      velocity,
      initial: [, initialY],
      event: { target },
    }) => {
      const {
        width: containerWidth,
      } = container.current.getBoundingClientRect();

      const {
        y: cardY,
        height: cardHeight,
      } = (target as HTMLDivElement).closest('.card').getBoundingClientRect();

      const threshold = Math.min(containerWidth / 4, 300);

      set((i) => {
        if (i === index - 1) {
          return {
            opacity: 1,
            scale: Math.min(1, 0.9 + Math.abs(dx) / threshold / 10),
          };
        }

        if (i !== index) return;

        const { id } = deck[i];

        if ((Math.abs(dx) > threshold || velocity > 0.2) && !down) {
          sorted.current.add(id);
        }

        const isSorted = sorted.current.has(id);
        const dir = dx > 0 ? 1 : -1;

        setBackground({
          background: down ? Math.max(-1, Math.min(1, dx / threshold)) : 0,
        });

        const x = isSorted ? containerWidth * dir : down ? dx : 0;

        const rotate = Math.max(
          Math.min(
            (((cardY + cardHeight / 2 - initialY) / cardHeight) *
              MAX_ROTATION *
              dx) /
              threshold,
            MAX_ROTATION
          ),
          -MAX_ROTATION
        );

        return {
          x,
          y: down ? dy : 0,
          rotate: down ? rotate : 0,
          opacity: isSorted ? 0 : 1,
        };
      });
    }
  );

  return (
    <animated.div
      ref={container}
      className="card-stack"
      style={{
        backgroundColor: background.to((p) => backgroundColor(p)),
      }}
    >
      {stack.map((styles, i) => (
        <animated.div
          key={cards[i].id}
          {...bind(i)}
          className="card-stack__card"
          style={styles}
        >
          <Card
            title={cards[i].name}
            icon={upperFirst(cards[i].id)}
            good={cards[i].good}
            bad={cards[i].bad}
          />
        </animated.div>
      ))}
    </animated.div>
  );
};

export default CardStack;
