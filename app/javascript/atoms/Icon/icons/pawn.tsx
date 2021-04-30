import React from 'react';
import COLORS from '../../../styles/colors.module.scss';
import Icon, { IconProps } from '../Icon';

const PawnIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      d="M17 19s-3-6-3-9v-.6c1.2-.7 2-2 2-3.4 0-2.2-1.8-4-4-4S8 3.8 8 6c0 1.5.8 2.8 2 3.4v.6c0 3-3 9-3 9H5v3h14v-3h-2z"
      fill={COLORS.white}
    />
    <path
      d="M19 19h-5v3h5v-3zM12.7 2.1c.8.7 1.3 1.8 1.3 2.9 0 2.2-1.8 4-4 4-.2 0-.5 0-.7-.1C10 9.6 11 10 12 10c2.2 0 4-1.8 4-4 0-2-1.4-3.6-3.3-3.9zM14 10c0 3 3 9 3 9h-4l-1-9h2z"
      fill={COLORS.blueGrey400}
    />
    <path
      d="M12 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM19 19H5v3h14v-3zM10 10c0 3-3 9-3 9M14 10c0 3 3 9 3 9M8 13h8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export default PawnIcon;
