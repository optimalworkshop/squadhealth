import React from 'react';
import chroma from 'chroma-js';
import COLORS from '../../../styles/colors.module.scss';
import Icon, { IconProps } from '../Icon';

COLORS.lightBlue250 = chroma.average([
  COLORS.lightBlue200,
  COLORS.lightBlue300,
]);

const ValueIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M6 3L2 9H8L6 3Z" fill={COLORS.white} />
    <path d="M6 3L8 9L12 3H6Z" fill={COLORS.lightBlue50} />
    <path d="M12 3L8 9H16L12 3ZM2 9L12 21L8 9H2Z" fill={COLORS.lightBlue100} />
    <path
      d="M8 9H16L12 21L8 9ZM12 3L16 9L18 3H12Z"
      fill={COLORS.lightBlue200}
    />
    <path d="M18 3L16 9H22L18 3Z" fill={COLORS.lightBlue250} />
    <path d="M16 9L12 21L22 9H16Z" fill={COLORS.lightBlue300} />
    <path
      d="M6 3H18L22 9L12 21L2 9L6 3Z"
      stroke={COLORS.blueGrey800}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);

export default ValueIcon;
