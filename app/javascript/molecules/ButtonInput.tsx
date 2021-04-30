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
  ({ button, className, disabled, onClick, onKeyPress, ...props }, ref) => {
    const keyPressed = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onClick(e);
      }
      if (onKeyPress) onKeyPress(e);
    };

    return (
      <div className={classNames('button-input', className)}>
        <input
          ref={ref}
          className="button-input__input"
          onKeyPress={keyPressed}
          {...props}
        />
        <Button
          className="button-input__button"
          text={button}
          disabled={disabled || undefined}
          onClick={onClick}
        />
      </div>
    );
  }
);

ButtonInput.displayName = 'ButtonInput';

export default ButtonInput;
