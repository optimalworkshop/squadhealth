import React from 'react';
import { useSelect } from 'react-cosmos/fixture';
import Throbber from './';
import COLORS from '../../styles/colors.module.scss';

const colors = Object.keys(COLORS)
  .filter((key) => key.match(/500$/))
  .map((key) => key.replace(/500$/, ''));

export default () => {
  const [color] = useSelect('color', {
    options: colors,
  });
  return (
    <div
      style={{
        ['--throbber-color' as any]: COLORS[`${color}500`],
        width: '16rem',
      }}
    >
      <Throbber />
    </div>
  );
};
