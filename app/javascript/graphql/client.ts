import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  Observable,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const createCache = () => {
  const cache = new InMemoryCache();
  if (process.env.NODE_ENV === 'development') {
    window['secretVariableToStoreCache'] = cache;
  }
  return cache;
};

const getToken = () =>
  document.querySelector('meta[name="csrf-token"]').getAttribute('content');
const token = getToken();
const setTokenForOperation = async (operation) =>
  operation.setContext({
    headers: {
      'X-CSRF-Token': token,
    },
  });

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

const createClient = (cache) => {
  return new ApolloClient({
    link: ApolloLink.from([
      createErrorLink(),
      createLinkWithToken(),
      createHttpLink(),
    ]),
    cache,
  });
};

export default createClient(createCache());
