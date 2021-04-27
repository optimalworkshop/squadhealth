import React from 'react';
import COLORS from '../../../styles/colors.module.scss';
import Icon, { IconProps } from '../Icon';

export default (props: IconProps) => (
  <Icon {...props}>
    <path d="M19 2h-4l-4 7 3 3-7 10 11-10-3-3 4-7z" fill={COLORS.yellow300} />
    <path d="M10 2h5l-4 7 3 3-7 10 3-10-3-2 3-8z" fill={COLORS.yellow200} />
    <path
      d="M19 2h-9l-3 8 3 2-3 10 11-10-3-3 4-7z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);
