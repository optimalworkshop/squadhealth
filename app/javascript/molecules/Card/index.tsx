import React, { forwardRef, ComponentPropsWithoutRef } from 'react';
import * as Icons from '../../atoms/Icon';
import Definition from '../Definition';

export interface CardProps extends ComponentPropsWithoutRef<'div'> {
  title: string;
  icon: keyof typeof Icons;
  good: string;
  bad: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ title, icon, good, bad, ...props }, ref) => {
    const Icon = Icons[icon];

    return (
      <div ref={ref} className="card" {...props}>
        <div className="card__inner">
          <Icon className="card__icon" />
          <h3 className="card__name">{title}</h3>
          <div className="card__definitions">
            <Definition score="good" description={good} />
            <Definition score="bad" description={bad} />
          </div>
        </div>
      </div>
    );
  }
);

export default Card;
