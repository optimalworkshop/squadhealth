import React, { useCallback, useRef } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import COLORS from '../../styles/colors.module.scss';

interface Props {
  digit: number;
  max?: number;
  onChange?: (value: number) => void;
}

const Digit: React.FC<Props> = ({ digit, max = 10, onChange }) => {
  const ref = useRef<HTMLDivElement>();

  const increment = useCallback(() => {
    onChange((digit + 1) % max);
  }, [onChange, digit, max]);

  const decrement = useCallback(() => {
    onChange((digit + max - 1) % max);
  }, [onChange, digit, max]);

  return (
    <div ref={ref} className="digit">
      <TransitionGroup component={null}>
        <CSSTransition key={digit} classNames="digit__split-" timeout={500}>
          <span className="digit__split" data-digit={digit}>
            {digit}
          </span>
        </CSSTransition>
      </TransitionGroup>
      {onChange && (
        <>
          <button onClick={increment}>
            <svg viewBox="-8 -8 40 40">
              <circle cx={12} cy={12} r={16} fill={COLORS.blueGrey100} />
              <polyline
                points="18 15 12 9 6 15"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button onClick={decrement}>
            <svg viewBox="-8 -8 40 40">
              <circle cx={12} cy={12} r={16} fill={COLORS.blueGrey100} />
              <polyline
                points="18 9 12 15 6 9"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

export default Digit;
