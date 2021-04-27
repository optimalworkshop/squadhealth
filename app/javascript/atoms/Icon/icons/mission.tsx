import React from 'react';
import COLORS from '../../../styles/colors.module.scss';
import Icon, { IconProps } from '../Icon';

export default (props: IconProps) => (
  <Icon {...props}>
    <path
      d="M13 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM16 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM18 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM19 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
      fill={COLORS.blueGrey400}
    />
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path
        d="m8.8 6 .6-.6c.8-.8.8-2 0-2.8-.8-.8-2-.8-2.8 0l-.6.6-.6-.6c-.8-.8-2-.8-2.8 0-.8.8-.8 2 0 2.8l.6.6-.6.6c-.8.8-.8 2 0 2.8.8.8 2 .8 2.8 0l.6-.6.6.6c.8.8 2 .8 2.8 0 .8-.8.8-2 0-2.8L8.8 6z"
        fill={COLORS.rose400}
      />
      <path d="M18 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" fill={COLORS.teal400} />
      <path d="M6 22a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" fill={COLORS.teal400} />
    </g>
    <path d="M18 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="currentColor" />
    <path d="M6 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="currentColor" />
  </Icon>
);
