import React from 'react';
import classNames from 'clsx';
import Face from '../../atoms/Face';

interface Props {
  score: 'good' | 'bad';
  description: string;
}

const Definition: React.FC<Props> = ({ score, description }) => {
  return (
    <div className={classNames('definition', `definition--${score}`)}>
      <Face className="definition__face" value={score === 'good' ? 1 : -1} />
      <p className="definition__description">{description}</p>
    </div>
  );
};

export default Definition;
