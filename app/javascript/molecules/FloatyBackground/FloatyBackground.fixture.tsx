import React, { useContext } from 'react';
import sample from 'lodash/sample';
import omit from 'lodash/omit';
import Button from '../../atoms/Button';
import FloatyBackground, { FloatyBackgroundContext } from './';
import * as ICONS from '../../atoms/Icon';

const ICON_NAMES = Object.keys(omit(ICONS, 'Close', 'Link', 'default'));

const AddButton: React.FC = () => {
  const { add } = useContext(FloatyBackgroundContext);
  return <Button onClick={() => add(sample(ICON_NAMES))}>Add</Button>;
};

export default (
  <FloatyBackground>
    <AddButton />
  </FloatyBackground>
);
