import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  Observable,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { createConsumer } from '@rails/actioncable';
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink';
import { DateTime } from 'luxon';

const cable = createConsumer();

const DateTimeField = {
  read: (value: string) => DateTime.fromISO(value),
};

const createCache = () => {
  const cache = new InMemoryCache({
    typePolicies: {
      HealthCheck: {
        fields: {
          startedAt: DateTimeField,
          endedAt: DateTimeField,
        },
      },
      Mutation: {
        fields: {
          recordVote: {
            merge: (_existing, incoming) => incoming,
          },
        },
      },
    },
  });
  if (process.env.NODE_ENV === 'development') {
    window['secretVariableToStoreCache'] = cache;
  }
  return cache;
};

const getToken = () =>
  document.querySelector('meta[name="csrf-token"]').getAttribute('content');

const addAuthCookie = (headers) => {
  const cookie = document.cookie
    .split(/;\s+/)
    .find((row) => row.startsWith('authentication='));
  return cookie
    ? { ...headers, Authorization: `bearer ${cookie.split('=')[1]}` }
    : headers;
};

const setTokenForOperation = async (operation) => {
  operation.setContext({
    headers: addAuthCookie({
      'X-CSRF-Token': getToken(),
    }),
  });
};

const createLinkWithToken = () =>
  new ApolloLink(
    (operation, forward) =>
      new Observable((observer) => {
        let handle;
        Promise.resolve(operation)
          .then(setTokenForOperation)
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            });
          })
          .catch(observer.error.bind(observer));
        return () => {
          if (handle) handle.unsubscribe();
        };
      })
  );

const logError = console.error;

const createErrorLink = () =>
  onError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
      logError('GraphQL - Error', {
        errors: graphQLErrors,
        operationName: operation.operationName,
        variables: operation.variables,
      });
    }
    if (networkError) {
      logError('GraphQL - NetworkError', networkError);
    }
  });

const createHttpLink = () =>
  new HttpLink({
    uri: '/graphql',
    credentials: 'include',
  });

const hasSubscriptionOperation = ({ query: { definitions } }) =>
  definitions.some(
    ({ kind, operation }) =>
      kind === 'OperationDefinition' && operation === 'subscription'
  );

const link = ApolloLink.split(
  hasSubscriptionOperation,
  new ActionCableLink({ cable }),
  createHttpLink()
);

const createClient = (cache) => {
  return new ApolloClient({
    link: ApolloLink.from([createErrorLink(), createLinkWithToken(), link]),
    cache,
  });
};

export default createClient(createCache());
