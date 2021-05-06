import React from 'react';
import ToasterProvider from './molecules/Toaster';

const Decorator = ({ children }) => (
  <ToasterProvider>
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
  </ToasterProvider>
);

export default Decorator;
