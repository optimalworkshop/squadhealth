import React, { useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { Flipper, Flipped } from 'react-flip-toolkit';
import classNames from 'clsx';
import Button from '../../../atoms/Button';
import RoomCode from '../../../atoms/RoomCode';

const SQUAD_QUERY = gql`
  query Room($code: ID!) {
    squad(id: $code) {
      id

      currentHealthCheck {
        id
        startedAt
      }

      healthChecks {
        id
        startedAt
      }
    }
  }
`;

interface Props {}

const Room = (props: Props) => {
  const { code } = useParams();

  return <h1>{code}</h1>;
};

export default Room;
