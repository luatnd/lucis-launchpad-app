import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
//   import { CachePersistor } from 'apollo-cache-persist';

// Cache implementation
const cache = new InMemoryCache();
// const persistor = new CachePersistor({
//   cache,
//   storage: window.localStorage,
// });
// persistor.restore();

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
});

let countGqlErrNetwork = 0;
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );

      if (message === "Unauthorized") {
        // when token expired or die, localStorage clear
        localStorage.clear();
        // redirect to login page
        window.location.href = "/auth/login";
      }
    });

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
    countGqlErrNetwork += 1;
  }
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  let token = "";
  if (!!window) {
    token = localStorage.getItem("token") ?? "";
  }

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

const client = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
  cache,
  connectToDevTools: true,
});

export default client;
