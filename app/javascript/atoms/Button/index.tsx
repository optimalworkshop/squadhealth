import React, { forwardRef, ComponentPropsWithoutRef } from 'react';
import classNames, { ClassValue } from 'clsx';

interface Props extends Omit<ComponentPropsWithoutRef<'button'>, 'className'> {
  className?: ClassValue;
  type?: 'button' | 'submit' | 'reset';
}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, type = 'button', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={classNames('button', className)}
        {...props}
      >
        <span className="button__text">{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
