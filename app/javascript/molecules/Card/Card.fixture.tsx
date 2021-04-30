import React from 'react';
import { useValue, useSelect } from 'react-cosmos/fixture';
import * as Icons from '../../atoms/Icon';
import Card from './';

const CardFixture: React.FC = () => {
  const [icon] = useSelect('icon', {
    options: Object.keys(Icons).filter((key) => key !== 'default'),
    defaultValue: 'Value',
  });

  const [title] = useValue('title', { defaultValue: 'Delivering value' });

  const [good] = useValue('good', {
    defaultValue:
      'We deliver great stuff! We’re proud of it and our stakeholders are really happy.',
  });

  const [bad] = useValue('bad', {
    defaultValue:
      'We deliver crap. We feel ashamed to deliver it. Our stakeholders hate us.',
  });

  return (
    <Card
      title={title}
      icon={icon as keyof typeof Icons}
      good={good}
      bad={bad}
    />
  );
};

export default CardFixture;
