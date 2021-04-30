import React from 'react';
import { ApolloProvider } from '@apollo/client/react';
import client from './client';

const Provider: React.FC = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default Provider;
