import React from 'react';
import COLORS from '../../../styles/colors.module.scss';
import Icon, { IconProps } from '../Icon';

const LearnIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      d="M6 18c-1.1 0-2 .9-2 2s.9 2 2 2h14c-.6 0-1-.9-1-2s.4-2 1-2H6z"
      fill={COLORS.white}
    />
    <path d="M19 18H6v2h13v-2z" fill={COLORS.blueGrey200} />
    <path d="M20 2H6v16h14V2z" fill={COLORS.teal300} />
    <path d="M6 2c-1.1 0-2 .9-2 2v16c0-1.1.9-2 2-2V2z" fill={COLORS.teal500} />
    <path
      d="M6 22c-1.1 0-2-.9-2-2s.9-2 2-2c.6 0 1 .9 1 2s-.4 2-1 2z"
      fill={COLORS.blueGrey300}
    />
    <g
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <path d="M12 2H6c-1.1 0-2 .9-2 2v16c0-1.1.9-2 2-2h14V2h-4" />
      <path d="M4 20c0 1.1.9 2 2 2h14c-.6 0-1-.9-1-2s.4-2 1-2" />
      <path d="M16 1v10l-2-1-2 1V1h4z" fill={COLORS.rose400} />
    </g>
  </Icon>
);

export default LearnIcon;
