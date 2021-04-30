import React from 'react';
import COLORS from '../../../styles/colors.module.scss';
import Icon, { IconProps } from '../Icon';

const SupportIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      d="M12 3c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 13c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"
      fill={COLORS.white}
    />
    <path
      d="m8.5 13.9-4.3 2.5c.8 1.4 1.9 2.5 3.2 3.3l2.5-4.3c-.6-.4-1.1-.9-1.4-1.5zM13.9 15.5l2.5 4.3c1.4-.8 2.5-1.9 3.4-3.3L15.5 14c-.5.7-1 1.2-1.6 1.5zM15.4 9.9l4.3-2.5c-.8-1.4-2-2.5-3.4-3.3l-2.5 4.3c.7.4 1.2.9 1.6 1.5zM9.9 8.6 7.4 4.3c-1.3.8-2.5 1.9-3.2 3.3l4.3 2.5c.3-.6.8-1.1 1.4-1.5z"
      fill={COLORS.rose400}
    />
    <path
      d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </Icon>
);

export default SupportIcon;
