import React from 'react';
import * as Icon from './';

export default () => (
  <div
    style={{
      width: '100%',
      display: 'grid',
      gap: '1rem',
      padding: '1rem',
      gridTemplateColumns: 'repeat(auto-fill, 5.5rem)',
    }}
  >
    {Object.keys(Icon).map((key) => {
      const Component = Icon[key];
      return (
        <span>
          <Component
            key={`${key}-small`}
            style={{ width: '1.5rem', height: '1.5rem' }}
          />
          <Component
            key={`${key}-large`}
            style={{ width: '4rem', height: '4rem' }}
          />
        </span>
      );
    })}
  </div>
);
