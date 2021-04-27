import React from 'react';
import COLORS from '../../../styles/colors.module.scss';
import Icon, { IconProps } from '../Icon';

export default (props: IconProps) => (
  <Icon {...props}>
    <path
      d="M21.9 9.2 12 12.4l-6.1 8.4c.6.5 1.5.6 2.3 0L12 18l3.8 2.8c.8.6 1.7.5 2.3 0 .6-.5 1-1.3.7-2.2l-1.5-4.5 3.8-2.8c.9-.5 1-1.4.8-2.1z"
      fill={COLORS.yellow300}
    />
    <path
      d="M20 7.8h-4.7l-1.5-4.5c-.2-.8-1-1.3-1.8-1.3s-1.6.5-1.9 1.4L8.6 7.9H4c-1 0-1.6.6-1.9 1.4-.2.7-.1 1.6.7 2.2l3.8 2.8-1.5 4.5c-.3.9.1 1.7.7 2.2l6.1-8.4 9.9-3.2c-.1-1-.8-1.6-1.8-1.6z"
      fill={COLORS.yellow200}
    />
    <path
      d="m12 18.1 3.8 2.8c1.5 1.1 3.6-.4 3-2.2l-1.5-4.5 3.8-2.8c1.5-1.1.7-3.6-1.2-3.6h-4.7l-1.5-4.5c-.6-1.8-3.1-1.8-3.7 0L8.5 7.8H4c-1.9 0-2.7 2.4-1.2 3.6l3.8 2.8-1.5 4.5c-.6 1.8 1.5 3.3 3 2.2l3.9-2.8z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);
