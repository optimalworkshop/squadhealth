import React from 'react';
import COLORS from '../../../styles/colors.module.scss';
import Icon, { IconProps } from '../Icon';

const TeamworkIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      d="M12 6c-1.7 0-3-1.3-3-3H7v3c0 3-1 6-3 6v9h16v-9c-2 0-3-3-3-6V3h-2c0 1.7-1.3 3-3 3z"
      fill={COLORS.white}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.4 13.5c-.1-.7-.4-1.2-.8-1.7-.3.5-.5 1.1-.6 1.7h1.4zM11.5 13.5v-3.4c-.8.1-1.6.5-2.2 1 .6.7 1 1.5 1.1 2.5h1.1v-.1zM15.9 13.5c-.1-.6-.3-1.2-.6-1.7-.4.5-.7 1.1-.8 1.7h1.4zM12.5 13.5h1.1c.1-.9.5-1.8 1.1-2.5-.6-.5-1.3-.9-2.2-1v3.5zM13.6 14.5h-1.1v3.4c.8-.1 1.6-.5 2.2-1-.6-.6-1-1.5-1.1-2.4zM14.6 14.5c.1.7.4 1.2.8 1.7.3-.5.5-1.1.6-1.7h-1.4zM11.5 14.5h-1.1c-.1.9-.5 1.8-1.1 2.5.6.5 1.3.9 2.2 1v-3.5zM8.1 14.5c.1.6.3 1.2.6 1.7.4-.5.7-1.1.8-1.7H8.1z"
      fill={COLORS.orange300}
    />
  </Icon>
);

export default TeamworkIcon;
