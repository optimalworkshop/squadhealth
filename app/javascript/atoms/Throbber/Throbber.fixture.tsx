import React from 'react';
import { useSelect } from 'react-cosmos/fixture';
import Throbber from './';
import COLORS from '../../styles/colors.module.scss';

const colors = Object.keys(COLORS)
  .filter((key) => key.match(/500$/))
  .map((key) => key.replace(/500$/, ''));

const ThrobberFixture: React.FC = () => {
  const [color] = useSelect('color', {
    options: colors,
  });
  return (
    <div
      style={{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ['--throbber-color' as any]: COLORS[`${color}500`],
        fontSize: '8rem',
      }}
    >
      <Throbber />
    </div>
  );
};

export default ThrobberFixture;
