import React, {
  useMemo,
  useRef,
  forwardRef,
  ComponentPropsWithoutRef,
} from 'react';
import { useSprings, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import upperFirst from 'lodash/upperFirst';
import mergeRefs from 'react-merge-refs';
import Card from '../Card';
import { Value } from '../../types';
import VALUES from '../../constants/values';

const MAX_ROTATION = 15;

interface Props extends ComponentPropsWithoutRef<'div'> {
  cards?: Value[];
  sorted?: Set<string>;
  onDragging?: (position: number) => void;
  onSort?: (card: Value, score: number) => void;
}

const CardStack = forwardRef<HTMLDivElement, Props>(
  (
    {
      cards: deck = Object.values(VALUES),
      sorted = new Set<string>(),
      onDragging,
      onSort,
      ...props
    },
    ref
  ) => {
    const container = useRef<HTMLDivElement>();

    const cards = useMemo(() => deck.slice().reverse(), [deck]);

    const [stack, set] = useSprings(cards.length, (i) => ({
      x: 0,
      y: 0,
      rotate: 0,
      opacity: i >= cards.length - 2 ? 1 : 0,
      scale: i === cards.length - 1 ? 1 : 0.9,
    }));

    const bind = useDrag(
      ({
        args: [index],
        down,
        movement: [dx, dy],
        velocity,
        initial: [, initialY],
        event: { target },
      }) => {
        const containerWidth = window.innerWidth;

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

          const { id } = cards[i];

          if ((Math.abs(dx) > threshold || velocity > 0.2) && !down) {
            sorted.add(id);
            if (onSort) {
              onSort(cards[i], dx > 0 ? 1 : -1);
            }
          }

          const isSorted = sorted.has(id);
          const dir = dx > 0 ? 1 : -1;

          if (onDragging) {
            onDragging(down ? Math.max(-1, Math.min(1, dx / threshold)) : 0);
          }

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
      <div ref={mergeRefs([ref, container])} className="card-stack" {...props}>
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
      </div>
    );
  }
);

CardStack.displayName = 'CardStack';

export default CardStack;
