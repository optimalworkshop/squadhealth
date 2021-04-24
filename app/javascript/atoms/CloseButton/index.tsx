import React, { forwardRef } from 'react';

interface Props {
  onClick: () => void;
}

const CloseButton = forwardRef<HTMLButtonElement, Props>(({ onClick }, ref) => (
  <button className="close-button" onClick={onClick} ref={ref}>
    <svg viewBox="0 0 24 24">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  </button>
));

export default CloseButton;
