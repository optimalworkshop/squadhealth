import React from 'react';
import COLORS from '../../../styles/colors.module.scss';
import Icon, { IconProps } from '../Icon';

const ProcessIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      d="M20.7 9.7c-.1-.4-.2-.7-.4-1.1-.2-.4-.3-.7-.5-1l-2.3.1c-.3-.4-.7-.8-1.1-1.1l.1-2.3c-.7-.4-1.4-.7-2.2-.9L12.8 5c-.5-.1-1-.1-1.5 0L9.7 3.3c-.4.1-.7.2-1.1.4-.4.2-.7.3-1 .5l.1 2.3c-.4.3-.8.7-1.1 1.1l-2.3-.1c-.4.7-.7 1.4-.9 2.2l1.7 1.6c-.1.5-.1 1 0 1.5l-1.7 1.6c.1.4.2.7.4 1.1.2.4.3.7.5 1l2.3-.1c.3.4.7.8 1.1 1.1l-.1 2.3c.7.4 1.4.7 2.2.9l1.6-1.7c.5.1 1 .1 1.5 0l1.6 1.7c.4-.1.7-.2 1.1-.4.4-.2.7-.3 1-.5l-.1-2.3c.4-.3.8-.7 1.1-1.1l2.3.1c.4-.7.7-1.4.9-2.2l-1.7-1.6c.1-.5.1-1 0-1.5l1.6-1.5zm-7.6 5.1c-1.5.6-3.3-.1-3.9-1.6-.6-1.5.1-3.3 1.6-3.9 1.5-.6 3.3.1 3.9 1.6.6 1.5 0 3.2-1.6 3.9z"
      fill={COLORS.blueGrey300}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.5 8.5c2 2 2 5.1 0 7.1s-5.1 2-7.1 0"
      stroke={COLORS.blueGrey400}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);

export default ProcessIcon;
