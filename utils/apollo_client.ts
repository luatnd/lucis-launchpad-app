import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  from,
  ApolloError,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { isClient } from "./DOM";
import AuthService from "../components/Auth/AuthService";
import { getLocalAuthInfo } from "../components/Auth/AuthLocal";
import { notification } from "antd";
//   import { CachePersistor } from 'apollo-cache-persist';

// Cache implementation
const cache = new InMemoryCache();

const authCache: {
  /**
   * store tmp auth token to send with graphql requests
   * If you wanna get JWT token of current user, plz get from AuthStore.token instead
   */
  token: string;
} = {
  token: _fetchInitialAuthTokenFromLocal(),
};

export function setAuthToken(token: string) {
  authCache.token = token;
}
if (isClient) {
  // @ts-ignore
  window.tmp__setApoloAuth = setAuthToken;
}

/**
 * If you wanna get JWT token of current user, plz get from AuthStore.token instead
 */
function _getAuthToken(): string {
  return authCache.token;
}

function _fetchInitialAuthTokenFromLocal(): string {
  const u = getLocalAuthInfo();
  return u ? u.token ?? "" : "";
}

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
    });

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
    countGqlErrNetwork += 1;
  }
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // TODO: Get token from auth service
  // let token = "";
  // if (!!window) {
  //   token = localStorage.getItem("token") ?? "";
  // }
  const token = _getAuthToken();
  console.log("{apolo.authLink} token: ", token);

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

const client = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
  cache,
  connectToDevTools: true,
});

export default client;

export function handleApolloError(error: ApolloError) {
  const { graphQLErrors, networkError } = error;
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      if (message === "Unauthorized") {
        // when token expired or die, localStorage clear
        // localStorage.clear();

        // redirect to login page
        // window.location.href = "/auth/login";
        notification["error"]({
          message: "Unauthorized",
          description: "Please connect wallet before!",
        });
      } else {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
        notification["error"]({
          message: "Error!",
          description: message,
        });
      }
    });

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
}
