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
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </g>
  </Icon>
);

export default LinkIcon;
