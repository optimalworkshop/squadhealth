import React, { forwardRef, ComponentPropsWithoutRef } from 'react';
import classNames, { ClassValue } from 'clsx';

interface Props extends Omit<ComponentPropsWithoutRef<'button'>, 'className'> {
  text: string;
  className?: ClassValue;
  type?: 'button' | 'submit' | 'reset';
}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ text, className, type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={classNames('button', className)}
        {...props}
      >
        <span className="button__text">{text}</span>
      </button>
    );
  }
);

export default Button;
