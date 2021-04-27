import React from 'react';

export default ({ children }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      overflowX: 'hidden',
    }}
  >
    {children}
  </div>
);
