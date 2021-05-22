import React, { ComponentProps, useEffect, forwardRef } from 'react';
import classNames from 'clsx';
import { render } from 'react-dom';
import range from 'lodash/range';

const addFilterDefinition = () => {
  if (document.querySelector('.goo-filter-definition')) return;

  const svg: SVGElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  );
  svg.setAttribute('version', '1.1');
  svg.setAttribute('viewBox', '-32, -32, 64, 64');
  svg.setAttribute('fill', 'currentColor');
  svg.classList.add('goo-filter-definition');
  svg.style.position = 'absolute';
  svg.style.width = '0';
  svg.style.height = '0';
  document.body.appendChild(svg);

  render(
    <defs>
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
          result="goo"
        />
        <feBlend in2="goo" in="SourceGraphic" result="mix" />
      </filter>
    </defs>,
    svg
  );
};

const MOONS = 3;

interface Props extends ComponentProps<'svg'> {}

const Throbber = forwardRef<SVGSVGElement, Props>(
  ({ className, ...props }, ref) => {
    useEffect(addFilterDefinition, []);

    return (
      <svg
        ref={ref}
        className={classNames('throbber', className)}
        viewBox="-32 -32 64 64"
        fill="currentColor"
        {...props}
      >
        <g>
          {range(MOONS).map((i) => (
            <g key={i} transform={`rotate(${(i * 360) / MOONS}, 0 0)`}>
              <circle
                className="throbber__moon"
                cx={0}
                cy={0}
                r={10}
                style={{ animationDelay: `${(i - 1) / MOONS}s` }}
              />
            </g>
          ))}
        </g>
      </svg>
    );
  }
);

Throbber.displayName = 'Throbber';

export default Throbber;
