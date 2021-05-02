import React, { createContext, useContext } from 'react';
import { gql, useQuery } from '@apollo/client';

const IDENTITY_QUERY = gql`
  query Identity {
    identity {
      id
    }
  }
`;

export type Identity = {
  id: string;
};

export const IdentityContext = createContext<Identity>(null);

export const useIdentity = (): Identity | null => useContext(IdentityContext);

const IdentityProvider: React.FC = ({ children }) => {
  const { data, loading } = useQuery(IDENTITY_QUERY);

  if (loading) return null;

  return (
    <IdentityContext.Provider value={data?.identity}>
      {children}
    </IdentityContext.Provider>
  );
};

export default IdentityProvider;
