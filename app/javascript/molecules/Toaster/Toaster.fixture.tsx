import React from 'react';
import faker from 'faker';
import Button from '../../atoms/Button';
import { useToaster } from './';

const AddButton: React.FC = () => {
  const { add } = useToaster();

  const clicked = () => {
    add({ contents: faker.lorem.sentences() });
  };

  return <Button text="Add" onClick={clicked} />;
};

const ToasterFixture: React.FC = () => <AddButton />;

export default ToasterFixture;
