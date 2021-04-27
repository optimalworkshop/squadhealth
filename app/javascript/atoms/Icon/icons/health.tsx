import React from 'react';
import COLORS from '../../../styles/colors.module.scss';
import Icon, { IconProps } from '../Icon';

export default (props: IconProps) => (
  <Icon {...props}>
    <path
      d="M14 16.8V4c0-1.1-.9-2-2-2s-2 .9-2 2v12.8c-.6.5-1 1.3-1 2.2 0 1.7 1.3 3 3 3s3-1.3 3-3c0-.9-.4-1.7-1-2.2z"
      fill={COLORS.white}
    />
    <path
      d="M10 10v6.8c-.6.5-1 1.3-1 2.2 0 1.7 1.3 3 3 3s3-1.3 3-3c0-.9-.4-1.7-1-2.2V10h-4z"
      fill={COLORS.rose400}
    />
    <path
      d="M12.5 5h1M12.5 9h1M12.5 7h1M12.5 11h1M12.5 13h1M12.5 15h1"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M14 16.8V4c0-1.1-.9-2-2-2s-2 .9-2 2v12.8c-.6.5-1 1.3-1 2.2 0 1.7 1.3 3 3 3s3-1.3 3-3c0-.9-.4-1.7-1-2.2z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);
