import React, { useMemo } from 'react';
import chroma from 'chroma-js';
import classNames, { ClassValue } from 'clsx';
import COLORS from '../../styles/colors.module.scss';

const FILL_COLOR_SCALE: chroma.Color[] = [
  COLORS.rose500,
  COLORS.yellow300,
  COLORS.green500,
].map((c) => chroma(c));

const STROKE_COLOR_SCALE: chroma.Color[] = [
  COLORS.rose900,
  COLORS.yellow900,
  COLORS.green900,
].map((c) => chroma(c));

interface Props {
  value: number;
  className?: ClassValue;
}

const fillColor = chroma.scale(FILL_COLOR_SCALE).domain([-1, 1]);
const strokeColor = chroma.scale(STROKE_COLOR_SCALE).domain([-1, 1]);

const Face: React.FC<Props> = ({ value, className }) => {
  const eyePath = useMemo(() => {
    const e = Math.min(1, value * 2 + 1);
    const f = Math.max(-1, value * 2 - 1);
    return [
      `M-2 0`,
      `C-2 ${e * -1.1}-1.1 ${e * -2} 0 ${e * -2} S2 ${e * -1.1} 2 0`,
      `C2 ${f * -1.1} 1.1 ${f * -2} 0 ${f * -2} S-2 ${f * -1.1} -2 0`,
    ].join(' ');
  }, [value]);

  const fill = useMemo(() => fillColor(value), [value]);
  const stroke = useMemo(() => strokeColor(value), [value]);

  return (
    <svg className={classNames('face', className)} viewBox="0 0 24 24">
      <g
        stroke={stroke}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
        fill={stroke}
      >
        <circle cx={12} cy={12} r={11} fill={fill} />
        <g transform={`translate(0, ${-value})`}>
          <g transform={`translate(0, 17)`}>
            <path
              d={`M9 ${-value} h6 Q12 ${value * 2} 9 ${-value}z`}
              strokeWidth={2}
            />
          </g>
          <g
            transform={`translate(7, 12) scale(${Math.abs(value / 4) + 0.75})`}
          >
            <path d={eyePath} />
          </g>
          <g
            transform={`translate(17, 12) scale(${Math.abs(value / 4) + 0.75})`}
          >
            <path d={eyePath} />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Face;
