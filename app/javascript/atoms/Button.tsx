import React, { forwardRef, HTMLAttributes } from 'react';
import classNames, { ClassValue } from 'clsx';

interface Props extends Omit<HTMLAttributes<HTMLButtonElement>, 'className'> {
  text: string;
  className?: ClassValue;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ text, className, type = 'button', disabled, ...props }, ref) => {
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
