import React from 'react';
import Icon, { IconProps } from '../Icon';

const LinkIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <g
      stroke="currentColor"
      fill="none"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </g>
  </Icon>
);

export default LinkIcon;
