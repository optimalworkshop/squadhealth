import React from 'react';
import COLORS from '../../../styles/colors.module.scss';
import Icon, { IconProps } from '../Icon';

const ReleaseIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M11 17s4-2 7-5 2-8 2-8L9 15l2 2z" fill={COLORS.rose400} />
    <path d="M7 13s2-4 5-7 8-2 8-2L9 15l-2-2z" fill={COLORS.rose300} />
    <g
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <path d="M11 17v3h3l2-6M7 13H4v-3l6-2" fill={COLORS.yellow300} />
      <path d="M11 17s4-2 7-5 2-8 2-8-5-1-8 2-5 7-5 7l4 4zM12 12l-6 6" />
    </g>
    <path
      d="M16 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
      fill="currentColor"
    />
  </Icon>
);

export default ReleaseIcon;
