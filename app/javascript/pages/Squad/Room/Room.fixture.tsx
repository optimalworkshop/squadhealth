import React from 'react';
import Interface from './Interface';

interface FixtureProps {
  loading: boolean;
}

const RoomFixture: React.FC<FixtureProps> = ({ loading }) => {
  return <Interface code="ABCD" loading={loading} />;
};

export default <RoomFixture loading={false} />;
