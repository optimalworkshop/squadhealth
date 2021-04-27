import React, { ComponentPropsWithoutRef } from 'react';
import chroma from 'chroma-js';
import classNames, { ClassValue } from 'clsx';
import COLORS from '../../styles/colors.module.scss';

export interface IconProps
  extends Omit<ComponentPropsWithoutRef<'svg'>, 'className'> {
  className?: ClassValue;
}

COLORS.lightBlue250 = chroma.average([
  COLORS.lightBlue200,
  COLORS.lightBlue300,
]);

const Icon: React.FC<IconProps> = ({ className, children, ...props }) => {
  return (
    <svg
      className={classNames('icon', className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
    >
      {children}
    </svg>
  );
};

export default Icon;
