import React from 'react';
import { useParams } from 'react-router-dom';

interface Props {}

const Room: React.FC<Props> = () => {
  const { code } = useParams();

  return <h1>{code}</h1>;
};

export default Room;
