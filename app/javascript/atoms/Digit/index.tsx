import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

interface Props {
  digit: number;
}

const Digit: React.FC<Props> = ({ digit }) => {
  return (
    <TransitionGroup className="digit">
      <CSSTransition key={digit} classNames="digit__split-" timeout={500}>
        <span className="digit__split" data-digit={digit}>
          {digit}
        </span>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Digit;
