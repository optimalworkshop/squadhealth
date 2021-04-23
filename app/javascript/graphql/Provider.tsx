import React from 'react';
import { ApolloProvider } from '@apollo/client/react';
import client from './client';

export default ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
