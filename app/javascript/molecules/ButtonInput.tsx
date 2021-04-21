import React, {
  ComponentPropsWithoutRef,
  forwardRef,
  MouseEventHandler,
} from 'react';
import classNames, { ClassValue } from 'clsx';
import Button from '../atoms/Button';

interface Props
  extends Omit<ComponentPropsWithoutRef<'input'>, 'className' | 'onClick'> {
  button: string;
  className?: ClassValue;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ButtonInput = forwardRef<HTMLInputElement, Props>(
  ({ button, className, disabled, onClick, ...props }, ref) => (
    <div
      className={classNames(
        'button-input',
        disabled && 'button-input--disabled',
        className
      )}
    >
      <input
        ref={ref}
        className="button-input__input"
        disabled={disabled || undefined}
        {...props}
      />
      <Button
        className="button-input__props"
        text={button}
        disabled={disabled || undefined}
        onClick={onClick}
      />
    </div>
  )
);

export default ButtonInput;
